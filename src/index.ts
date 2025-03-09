import Server from './server';

export class JobApplication {
  run() {
    const server = new Server();
    server.start();
  }
}

const job = new JobApplication();
job.run();
