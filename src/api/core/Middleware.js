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
}
