import client from "prom-client"; // Metric Collection

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const register = client.register;

// Histogram: Response Time
const httpRequestDuration = new client.Histogram({
    name: "http_request_duration_ms",
    help: "Duration of HTTP requests in ms",
    labelNames: ["method", "route", "status_code"],
    buckets: [50, 100, 300, 500, 1000],
});

// Counter: Total HTTP Requests
export const totalHttpRequests = new client.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests received",
    labelNames: ["method", "route", "status_code"],
});

export const metricsMiddleware = (req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const route = req.route?.path || req.path;

        httpRequestDuration
            .labels(req.method, route, res.statusCode)
            .observe(duration);

        totalHttpRequests.labels(req.method, route, res.statusCode).inc();
    });

    next();
};

export const metricsRoute = (app) => {
    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", register.contentType);
        res.end(await register.metrics());
    });
};
