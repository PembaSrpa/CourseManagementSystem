import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { db } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import courseRouter from "./routes/courseRouter.js";
import studentRouter from "./routes/studentRouter.js";
import teacherRouter from "./routes/teacherRouter.js";

const app = express();
configDotenv();
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api", studentRouter);
app.use("/api", teacherRouter);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
