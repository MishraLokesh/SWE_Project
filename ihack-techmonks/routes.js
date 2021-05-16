const routes = require('next-routes')();

routes
  .add('/healthhub/new', '/healthhub/new')
  .add('/healthhub/:address', '/healthhub/show')
  .add('/healthhub/:address/requests', '/healthhub/requests/index')
  .add('/healthhub/:address/requests/new', '/healthhub/requests/new');

module.exports = routes;
