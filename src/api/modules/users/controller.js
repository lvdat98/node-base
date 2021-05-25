import Controller from '../../core/Controller';
import UserService from './service';

export default class UserController extends Controller {
  constructor() {
    super();
    this.service = new UserService();
  }
}
