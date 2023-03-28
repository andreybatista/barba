import express from 'express';
import { createUser, getAllUsers, getUserById } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post('/add', createUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);