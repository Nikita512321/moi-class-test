import express from "express";
import lessonsRouter from "./routers/lessonRouter.js";

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.set("Content-Type", "application/json");
  next();
});

app.use("/lessons", lessonsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
