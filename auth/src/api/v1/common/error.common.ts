import { ValidationError } from 'express-validator';

export abstract class CustomError extends Error {
  abstract statusCode: number;

  abstract serializeError(): {
    message: string;
    field?: string;
  }[];

  constructor(message: string) {
    super(message);

    // because we extend built-in class in ts
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request body');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map(err => ({
      message: err.msg,
      field: err.param,
    }));
  }
}

export class DBConnectionError extends CustomError {
  statusCode = 500;

  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to database');
    Object.setPrototypeOf(this, DBConnectionError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [
      {
        message: `not found`,
      },
    ];
  }
}

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
