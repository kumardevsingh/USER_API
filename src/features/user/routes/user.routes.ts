import express from 'express';
import userController from '../controllers/user.controller';
import asyncWrapper from '../../../globals/cores/asyncwrapper.core';

const userRoutes = express.Router();

userRoutes.get('/', asyncWrapper(userController.getAll));
userRoutes.post('/create', asyncWrapper(userController.create));

export default userRoutes;
