import middleware from "../middleware/index.js";
import {
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
  info,
} from "../controllers/user.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/info", [middleware.authJwt.verifyToken], info);

  app.get("/api/test/all", allAccess);

  app.get("/api/test/user", [middleware.authJwt.verifyToken], userBoard);

  app.get(
    "/api/test/mod",
    [middleware.authJwt.verifyToken, middleware.authJwt.isModerator],
    moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [middleware.authJwt.verifyToken, middleware.authJwt.isAdmin],
    adminBoard
  );
}
