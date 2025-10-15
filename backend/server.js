import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';



const app = express();
const port = process.env.PORT || 7777;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'; 

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());



app.use('/api/user',userRouter);
app.use('/api/tasks',taskRouter)


connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(port, () => {
      console.log(`Server is successfully listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
