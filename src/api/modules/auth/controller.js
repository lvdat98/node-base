import Controller from '../../core/Controller';
import AuthService from './service';

export default class AuthController extends Controller {
  constructor() {
    super();
    this.service = new AuthService();
  }

  loginAnonymous(request) {
    const { payload } = request;
    return this.service.loginAnonymous(payload);
  }

  register(request) {
    const { payload } = request;
    return this.service.register(payload);
  }

  login(request) {
    const { payload } = request;
    return this.service.login(payload);
  }

  adminLogin(request) {
    const { payload } = request;
    return this.service.adminLogin(payload);
  }

  forgotPassword(request) {
    const { payload } = request;
    return this.service.forgotPassword(payload);
  }

  resetPassword(request) {
    const { payload } = request;
    return this.service.resetPassword(payload);
  }

  loginWithFacebook(request) {
    return this.service.loginWithFacebook(request);
  }

  loginWithGoogle(request) {
    return this.service.loginWithGoogle(request);
  }

  loginWithReddit(request) {
    return this.service.loginWithReddit(request);
  }

  loginWithDiscord(request) {
    return this.service.loginWithDiscord(request);
  }
}
