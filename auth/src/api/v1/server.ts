import bodyParser from 'body-parser';
import express, { Express, Response, Request } from 'express';
import morgan from 'morgan';
import 'express-async-errors';
import mongoose from 'mongoose';
import { NotFoundError } from './common/error.common';
import { ErrorHandler } from './middlewares/error.middleware';
import settingRouters from './modules/users/routes';
import './configs/env.config';
import CatLogging from './libs/cat-log.lib';

const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// logging
app.use(morgan('dev'));

const SERVICE_NAME = process.env.SERVICE_NAME || 'auth';
const PORT = process.env.NODE_PORT || 3000;
const PREFIX = '/api/v1/user';

app.get(`${PREFIX}/ping`, (req: Request, res: Response) => {
  res.json({
    message: 'pong',
  });
});
settingRouters(PREFIX, app);
// app.get('/api/user/currentUser', (req: Request, res: Response) => {
//   res.json({
//     message: 'current user api',
//   });
// });

// handle not found error
app.use('*', async () => {
  throw new NotFoundError();
});

// Error handling
app.use(ErrorHandler);

const start = async () => {
  try {
    CatLogging.log(process.env.DB_CONN_STRING);
    await mongoose.connect(process.env.DB_CONN_STRING || '');
    CatLogging.log('Connected to mongodb');
  } catch (error) {
    CatLogging.error(error);
  }

  app.listen(PORT, () => {
    console.log(SERVICE_NAME, 'v:0.0.1', 'is running on port', PORT);
  });
};
export default start;
export { start };
