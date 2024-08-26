import express, { Request, Response } from 'express';
import adminRouter from './routes/admin/adminRouter'

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.use('/admin', adminRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
