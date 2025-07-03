# 📊 MonitorServices

A complete real-time monitoring stack for Node.js microservices using **Prometheus** and **Grafana** — designed to provide insight into service performance, health, and scalability.

---

## 📦 Tech Stack

- **Node.js** (Express Microservices)
- **Prometheus** – metrics scraping and collection
- **Grafana** – dashboard visualization
- **Docker Compose** – service orchestration
- **prom-client** – for exposing custom metrics
- **Winston + Loki** (optional) – for logging observability

---

## 🎯 Features

- 📊 Real-time API metrics (response time, request count)
- 🚦 Health tracking per microservice
- 📈 Grafana dashboards with Prometheus datasource
- 🧪 Custom metrics using `prom-client`
- 🔒 Ready for containerized environments
- ⚙️ Extendable with Loki for centralized logs

---

## 🧱 Project Structure

```
MonitorService/
│
├── auth-service/
│   └── metrics & logger setup
│
├── user-service/
│   └── metrics & logger setup
│
├── api-gateway/
│   └── routes, proxy & metrics
│
├── monitoring/
│   ├── docker-compose.monitoring.yml
│   ├── prometheus/
│   │   └── prometheus.yml
│   └── grafana/ (optional dashboards)
│
└── README.md
```

---

## 🚀 Getting Started

1️⃣ Clone the repo:

```bash
git clone https://github.com/ANKITKUMARBARIK/MonitorServices.git
cd MonitorServices
```

2️⃣ Start Monitoring Stack:

```bash
docker compose -f monitoring/docker-compose.monitoring.yml up -d
```

3️⃣ Access the dashboards:
- Grafana: [http://localhost:3000](http://localhost:3000)
- Prometheus: [http://localhost:9090](http://localhost:9090)

---

## 📌 Grafana Dashboards

✅ Response time per route  
✅ Total requests per service  
✅ Service uptime/availability  
✅ Custom metrics like user creation, login attempts etc.

> 🔒 Default Grafana login: `admin` / `admin`

---

## 📈 Sample Custom Metric in Node.js

```js
import client from "prom-client";

const httpRequestDuration = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [50, 100, 300, 500, 1000],
});

export const metricsMiddleware = (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    httpRequestDuration.labels(req.method, req.route?.path || req.path, res.statusCode).observe(duration);
  });
  next();
};
```

---

## 🤝 Contributions

Pull requests and suggestions are welcome! Open issues for any feature requests or bugs.

---

## 📄 License

GNU © ANKIT