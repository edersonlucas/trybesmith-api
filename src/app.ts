import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import productRouter from './routes/productRouter';
import userRouter from './routes/userRouter';
import orderRouter from './routes/orderRouter';

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(errorMiddleware);

export default app;
