import express from "express";
import { metricsMiddleware, metricsRoute } from "../metrics/prometheus.js";

const app = express();

app.use(metricsMiddleware);
metricsRoute(app);

export default app;
