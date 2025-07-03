import dotenv from "dotenv";
import app from "./app.js";
import doSomeHeavyTask from "./utils/task.util.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    return res.json({ msg: "monitoring with prometheus and grafna" });
});

app.get("/slow", async (req, res) => {
    try {
        const timeTaken = await doSomeHeavyTask();
        return res.json({
            status: "success",
            msg: `heavy task completed in ${timeTaken}ms`,
        });
    } catch (error) {
        return res
            .status(500)
            .json({ status: "error", error: `internal server error` });
    }
});

app.listen(PORT, () => console.log(`Auth Service started on PORT:${PORT}`));

// Monitoring -> Metrics & Log Collection
