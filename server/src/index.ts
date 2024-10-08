import express, { Application, NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import { Server } from "socket.io";
import { createServer } from "http";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import { instrument } from "@socket.io/admin-ui";

// route import
import authRoute from "./routes/app.routes";
import { CustomError } from "./utils/errorHandler";
import { setUpSocket } from "./socket";
import redis from "./config/redis_config";

const app: Application = express();
const PORT = process.env.PORT ?? 3001 ?? 3002;

//web socket
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    credentials: true
  },
  adapter: createAdapter(redis)
})

instrument(io, {
  auth: false,
  mode: "development",
});

setUpSocket(io);
export { io };

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.use("/api", authRoute);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(404).json({
      success: true,
      message: "route not found!"
    })
  } catch (error) {
    next(error);
  }
})

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internel server error"

  return res.status(500).json({
    success: false,
    statusCode,
    message
  });
})


server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
