import {
  upload,
  list,
  getFile,
  deleteFile,
  downloadFile,
  updateFile,
} from "../controllers/file.controller.js";
import middleware from "../middleware/index.js";

export default function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/file/upload",
    [middleware.authJwt.verifyToken, middleware.file.uploadFile.single("file")],
    upload
  );

  app.get("/file/list", [middleware.authJwt.verifyToken], list);

  app.get("/file/:id", [middleware.authJwt.verifyToken], getFile);

  app.get("/file/delete/:id", [middleware.authJwt.verifyToken], deleteFile);

  app.get("/file/download/:id", [middleware.authJwt.verifyToken], downloadFile);

  app.put(
    "/file/update/:id",
    [middleware.authJwt.verifyToken, middleware.file.uploadFile.single("file")],
    updateFile
  );
}
