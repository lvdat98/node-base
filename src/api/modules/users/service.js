import Service from '../../core/Service';
import User from '../../../database/model/User';

export default class UserService extends Service {
  constructor() {
    super();
    this.model = User;
  }
}
