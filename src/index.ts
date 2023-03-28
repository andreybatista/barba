import express, { Application } from 'express';
import { userRouter } from './routes/userRouter';

const app: Application = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Routes
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
