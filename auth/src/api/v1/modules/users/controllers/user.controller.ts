import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {
  BadRequestError,
  RequestValidationError,
} from '@src/api/v1/common/error.common';
import { User } from '../models/users.model';

const signup = async (req: Request, res: Response, _next: NextFunction) => {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    throw new RequestValidationError(errs.array());
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('email in use');
  }

  const newUser = User.build({ email, password });

  await newUser.save();

  res.status(200).json({
    user: newUser,
  });
  // throw new DBConnectionError();
};

const userController = {
  signup,
};

export default userController;
