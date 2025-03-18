import express from 'express';
import authController from '../controllers/auth.controller';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';

const authRoutes = express.Router();

authRoutes.post('/signup', asyncWrapper(authController.signUp));
authRoutes.post('/signin', asyncWrapper(authController.signIn));

export default authRoutes;
