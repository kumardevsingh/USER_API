import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { appRoutes } from './globals/routes/appRoutes';
import { StatusCodes } from 'http-status-codes';
import { CustomError, NotFoundException } from './globals/cores/error.core';

export default class Server {
  app: Application;
  prisma: PrismaClient;

  constructor() {
    this.app = express();
    this.prisma = new PrismaClient();
  }

  public async start() {
    await this.connectToDatabase();
    this.middlewares();
    this.routes();
    this.setupGlobalErrors();
    this.listenServer();
  }

  private async connectToDatabase() {
    try {
      await this.prisma.$connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Failed to connect to the database', error);
      process.exit(1);
    }
  }

  private middlewares() {
    this.app.use(express.json());
  }
  private routes() {
    appRoutes(this.app);
  }
  private setupGlobalErrors() {
    //all request type
    this.app.all('*', (req: Request, res: Response, next: NextFunction) => {
      // res.status(StatusCodes.NOT_FOUND).json({
      //   message: `Can't find ${req.originalUrl} on this server with method ${req.method}!`,
      // });
      next(
        new NotFoundException(
          `Can't find ${req.originalUrl} on this server with method ${req.method}!`,
        ),
      );
    });
    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof CustomError) {
          res.status(error.statusCode).json({ message: error.message });
        } else {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
          });
        }
      },
    );
  }

  listenServer() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
