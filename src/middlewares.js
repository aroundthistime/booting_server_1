export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error('You need to login for this service');
  }
};
