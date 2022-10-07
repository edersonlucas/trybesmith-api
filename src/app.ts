import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import productRouter from './routes/productRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(errorMiddleware);

export default app;
