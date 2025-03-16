import express from 'express';
import authController from '../controllers/auth.controller';

const authRoutes = express.Router();

authRoutes.post('/signup', authController.signUp);
authRoutes.post('/signin', authController.signIn);

export default authRoutes;
