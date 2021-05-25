import Controller from '../../core/Controller';
import AuthService from './service';

export default class AuthController extends Controller {
  constructor() {
    super();
    this.service = new AuthService();
  }

  login(request) {
    const { payload } = request;
    return this.service.login(payload);
  }
}
