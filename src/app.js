import express from "express";
import cors from "cors";
import { appconfig } from "./configs/appconfig.js";

export const app = express();

app.use(express.json());
app.use(
  cors({
    origin: appconfig.REACT_APP_BASE_URL,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

import emailRoute from "./routes/Emailroutes.js";

app.use("/api/v1/portfolio", emailRoute);
