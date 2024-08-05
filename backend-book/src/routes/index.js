import routerBook from "./book.js";
import routerUser from "./user.js";

const routes = (app) => {
  app.use("/user", routerUser);

  app.use("/book", routerBook);
  
  app.use("/", (req, res) => {
    res.send("Home");
  });
};

export default routes;
