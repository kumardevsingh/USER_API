import express, { Application } from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { appRoutes } from './globals/routes/appRoutes';

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
  private setupGlobalErrors() {}

  listenServer() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
