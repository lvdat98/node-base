import Service from '../../core/Service';
import User from '../../../database/models/User';

export default class UserService extends Service {
  constructor() {
    super();
    this.model = User;
  }
}
