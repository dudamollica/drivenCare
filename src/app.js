import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";

dotenv.config();
const server = express();
server.use(cors());
server.use(express.json());
server.use(routes);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server run port=${port}`));
