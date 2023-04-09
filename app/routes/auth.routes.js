import middleware from "../middleware/index.js";
import {
  signup,
  signin,
  refreshToken,
  logout,
} from "../controllers/auth.controller.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/signup",
    [
      middleware.verifySignUp.checkDuplicateUsernameOrEmail,
      middleware.verifySignUp.checkRolesExisted,
    ],
    signup
  );

  app.post("/signin", signin);

  app.post("/signin/new_token", refreshToken);

  app.get("/logout", [middleware.authJwt.verifyToken], logout);
}
