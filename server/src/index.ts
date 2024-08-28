import express, { Request, Response } from 'express';
const cors = require('cors')
const logRequest = require('./middleware/logRequest')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
// const adminRouter =require('./routes/admin/adminRouter')
const app = express();
const port = process.env.PORT || 3001;
app.use(cors())
app.use(express.json());
app.use(logRequest);


// app.use('/admin', adminRouter);

app.use(notFound, errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
