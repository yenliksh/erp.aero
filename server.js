/* eslint-disable no-unused-vars */

import express, { json, urlencoded } from "express";
import cors from "cors";
import authRoutes from "./app/routes/auth.routes.js";
import userRoutes from "./app/routes/user.routes.js";
import fileRoutes from "./app/routes/file.routes.js";
import { createClient } from "redis";
// database
import db from "./app/models/index.js";
import { REDIS_PORT } from "./app/config/auth.config.js";

const client = createClient(REDIS_PORT);
client.on("error", (err) => console.log("Redis Client Error", err));
await client.connect();
export default client;

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

const Role = db.role;

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

authRoutes(app);
userRoutes(app);
fileRoutes(app);

// set port, listen for requests
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
