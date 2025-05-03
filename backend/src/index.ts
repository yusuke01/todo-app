import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './routes/todo';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/todos', todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
