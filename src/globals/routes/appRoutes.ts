import { Application } from 'express';
import userRoutes from '../../features/user/routes/user.routes';

export function appRoutes(app: Application) {
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/user', userRoutes);
  app.use('/', (req, res) => {
    res.send('Hello World');
  });
}
