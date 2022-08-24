import { check } from 'express-validator';

const signupValidate = () => {
  return [
    check('email', 'email does not Empty!').notEmpty(),
    check('email', 'email must be email type').isEmail(),

    check('password', 'password is not Empty!').notEmpty(),
    check('password', 'password must be Alphanumeric!').isAlphanumeric(),
    check('password', 'password must be more than 6 digits!').isLength({
      min: 6,
    }),
  ];
};

const signinValidate = () => {
  return [
    check('email', 'email does not Empty!').notEmpty(),
    check('email', 'email must be email type').isEmail(),

    check('password', 'password is not Empty!').notEmpty(),
    check('password', 'password must be Alphanumeric!').isAlphanumeric(),
    check('password', 'password must be more than 6 digits!').isLength({
      min: 6,
    }),
  ];
};

const userValidate = {
  signinValidate,
  signupValidate,
};

export default userValidate;
