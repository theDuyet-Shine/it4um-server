import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { handleConnectDB } from "./mongoConfig.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import tagRouter from "./routes/tagRoute.js";
import commentRouter from "./routes/commentRoute.js";
import notificationRouter from "./routes/notificationRoute.js";
import adminRouter from "./routes/adminRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

handleConnectDB();
const port = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.status(200).json("Hello world");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/tag", tagRouter);
app.use("/comment", commentRouter);
app.use("/notification", notificationRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
