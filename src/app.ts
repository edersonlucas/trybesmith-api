import express from 'express';
import errorMiddleware from './middlewares/errorMiddleware';
import productRouter from './routes/productRouter';

const app = express();

app.use(express.json());
app.use(productRouter);
app.use(errorMiddleware);

export default app;
