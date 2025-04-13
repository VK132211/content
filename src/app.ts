import express from "express";
import apiRoutes from "../src/routes/apiRoutes";
const app = express();
app.use(
  express.json({
    type: ["application/json", "application/vnd.api+json"],
  })
);
app.use("/api", apiRoutes);
export default app;
