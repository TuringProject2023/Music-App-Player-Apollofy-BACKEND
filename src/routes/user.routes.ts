import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getUserByEmailParams, updateUserById } from '../controllers/';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmailParams)
    .get('/', getAllUsers)
    .put('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;