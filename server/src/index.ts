import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";

// route import
import authRoute from "./routes/app.routes";

const app: Application = express();
const PORT = process.env.PORT || 3001;

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.use("/api", authRoute);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
