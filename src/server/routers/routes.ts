const routes = {
  general: {
    root: "/",
    ping: "/",
    endpoints: "/endpoints",
  },
  users: {
    root: "/users",
    list: "/",
  },
  user: {
    root: "/user",
    user: "/:userId",
  },
};

export default routes;
