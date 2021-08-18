export default class CoreMiddleware {
  onPreResponse(request, versions) {
    const { response } = request;
    if (response.isBoom) {
      response.output.headers = {
        ...response.output.headers,
        ...versions,
      };
      return response;
    }
    response.headers = {
      ...response.headers,
      ...versions,
    };
    return response;
  }

  onGetMany = async (request) => {
    if (request.query.filter) {
      const filter = JSON.parse(JSON.parse(request.query.filter));
      request.query.filter = filter;
    }
    return request;
  };
}
