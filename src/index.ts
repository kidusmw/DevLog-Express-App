import express from "express";
import healthRouter from "./routes/health";
import authRouter from "./routes/auth";
import changeLogRouter from "./routes/changelog";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/changelog", changeLogRouter);

app.listen(PORT, () => {
  console.log(`DevLog API running on http://localhost:${PORT}`);
});
