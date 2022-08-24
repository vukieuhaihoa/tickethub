import express, { Request, Response } from 'express';
import userValidate from '@src/api/v1/middlewares/user-vaidator.middleware';
import userController from '../controllers/user.controller';

const router = express.Router();

router.post('/signin', (req: Request, res: Response) => {
  res.send('hi');
});

router.post('/signup', userValidate.signupValidate(), userController.signup);

router.post('/signout', (req: Request, res: Response) => {
  res.send('hi');
});

router.get('/current', (req: Request, res: Response) => {
  res.send('hi');
});

export default router;
