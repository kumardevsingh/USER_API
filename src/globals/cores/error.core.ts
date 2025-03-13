import { StatusCodes } from 'http-status-codes';

export abstract class CustomError extends Error {
  abstract status: string;
  abstract statusCode: number;
  constructor(message: string) {
    super(message);
    // Object.setPrototypeOf(this,CustomError.prototype);
  }
  // abstract serializeErrors() : {message : string,field? : string}[];
}

export class BadRequestException extends CustomError {
  status = 'error';
  statusCode: number = StatusCodes.BAD_REQUEST;
  constructor(public message: string) {
    super(message);
  }
}

export class NotFoundException extends CustomError {
  status = 'error';
  statusCode: number = StatusCodes.NOT_FOUND;
  constructor(public message: string) {
    super(message);
  }
}

export class UnAuthorizedException extends CustomError {
  status = 'error';
  statusCode: number = StatusCodes.UNAUTHORIZED;
  constructor(public message: string) {
    super(message);
  }
}

export class InternalServerError extends CustomError {
  status = 'error';
  statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  constructor(public message: string) {
    super(message);
  }
}

export class ForbiddenException extends CustomError {
  status = 'error';
  statusCode: number = StatusCodes.FORBIDDEN;
  constructor(public message: string) {
    super(message);
  }
}
