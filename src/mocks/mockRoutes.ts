import routes from "../server/routers/routes";

const { general, users, user } = routes;

const mockRoutes = {
  message: "List of endpoints",
  general: {
    [general.ping]: "Get a ping from the API",
    [general.endpoints]: "Get all endpoints list",
  },
  users: {
    [users.root]: "Get all users in cache list",
  },
  user: {
    [user.root + user.user]: "Get a user for userId",
  },
};

export default mockRoutes;
