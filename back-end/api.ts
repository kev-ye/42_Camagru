import express, { Express } from 'express';
import { connectToDB } from './src/services/db.service'
import { userRouter } from "./src/routes/user";

const port = 3000;
const app: Express = express();


connectToDB().then(() => {
  app.use('/api/users', userRouter);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})