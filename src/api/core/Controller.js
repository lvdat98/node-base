export default class Controller {
  getMany(request) {
    return this.service.getMany(request.query);
  }

  getOne(request) {
    const { id } = request.params;
    return this.service.getOne(id);
  }

  createOne(request) {
    const { payload } = request;
    return this.service.createOne(payload);
  }

  updateOne(request) {
    const { params, payload } = request;
    const { id } = params;
    return this.service.updateOne(id, payload);
  }

  deleteOne(request) {
    const { id } = request.params;
    return this.service.deleteOne(id);
  }

  deleteMultiple(request) {
    const { ids } = request.payload;
    return this.service.deleteMultiple(ids);
  }

  getCredentialInfo(request) {
    if (request.auth.isAuthenticated) {
      const { id: userId, scope } = request.auth.credentials;
      return { userId, scope };
    }
    return { userId: null, scope: null };
  }
}
