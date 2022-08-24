import { Express } from 'express';
import UserRouter from './user.route';

const settingRouters = (prefix: string, app: Express) => {
  app.use(`${prefix}/auth`, UserRouter);
};

export default settingRouters;
