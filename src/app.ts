import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import productRouter from './routes/productRouter';
import userRouter from './routes/userRouter';
import orderRouter from './routes/orderRouter';
import loginRouter from './routes/loginRouter';

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(userRouter);
app.use(orderRouter);
app.use(loginRouter);
app.use(errorMiddleware);

export default app;
