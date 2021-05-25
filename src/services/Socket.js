import socketio from 'socket.io';
import redis from 'redis';
import redisAdapter from 'socket.io-redis';
import logger from '../utils/Winston';
import JWT from './Jwt';
import User from '../database/models/User';

const rd = redis.createClient(process.env.DATABASE_URL_REDIS);
rd.on('error', () => logger.error('Redis connection not succeeded'));

export default class Socket {
  constructor(server) {
    this.socket = socketio().listen(server.listener);
  }

  async connect() {
    this.socket.adapter(redisAdapter(process.env.DATABASE_URL_REDIS));
    this.socket.of('/').adapter.on('error', (err) => {
      logger.error(err);
      process.exit(1);
    });
    // eslint-disable-next-line consistent-return
    this.verify = (socket, next) => {
      const { token } = socket.handshake.query;
      if (!token) {
        return next('NOT_AUTHORIZED');
      }
      const decoded = JWT.verify(token);
      socket.decoded = decoded;
      if (!decoded) {
        return next('NOT_AUTHORIZED');
      }
      next();
    };
    const pub = redis.createClient(process.env.DATABASE_URL_REDIS);
    const sub = redis.createClient(process.env.DATABASE_URL_REDIS);
    const userIO = this.socket.of('/users').use((socket, next) => {
      this.verify(socket, next);
    });

    sub.on('message', (channel, message) => {
      const data = JSON.parse(message);
      if (data.sendType === 'sendToAllClientsInRoom') {
        switch (data.namespace) {
          default:
            userIO.to(channel).emit(data.method, data.data);
            break;
        }
      }
    });
    userIO.on('connection', async (socket) => {
      let currentRoom;
      logger.verbose('Connection with chat room succeeded.');
      socket.on('joinRoom', (room) => {
        currentRoom = room;
        sub.subscribe(room);
        socket.join(room);
      });
      socket.on('sendMessage', async (content) => {
        const { room } = content;
        delete content.room;
        const reply = JSON.stringify({
          namespace: 'chat',
          method: 'newMessage',
          sendType: 'sendToAllClientsInRoom',
          data: content,
        });
        pub.publish(room, reply);
      });
      socket.on('disconnecting', async () => {
        const user = await User.findById(socket.decoded.id);
        if (currentRoom) {
          pub.publish(
            currentRoom,
            JSON.stringify({
              namespace: 'chat',
              method: 'leaveRoom',
              sendType: 'sendToAllClientsInRoom',
              data: { userId: user.id, userName: user.username },
            })
          );
        }
      });
    });
    process.on('uncaughtException', (err) => {
      logger.error(err);
    });
  }
}
