// Sử Dụng express
import usersRouter from "./routes/auth";
import productsRouter from "./routes/products"
import  mongoose  from 'mongoose';
import cors from 'cors';
import express, { Application } from 'express';
import categoryRouter from './routes/category'

const app: Application = express();

app.use(cors());
app.use(express.json());
// router 
app.use("/api", productsRouter);
app.use("/api", usersRouter);
app.use("/api", categoryRouter);

mongoose.connect("mongodb://127.0.0.1:27017/we17302").then(()=> console.log("Kết nối thành công"));

export const viteNodeApp = app;

