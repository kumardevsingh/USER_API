import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Joi, { Schema } from 'joi';

function formatErrorMessage(error: Joi.ValidationError) {
  return error.details.map((err) => err.message);
}

export function verifySchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Validation Error',
        error: formatErrorMessage(error),
      });
      return;
    }
    next();
  };
}
