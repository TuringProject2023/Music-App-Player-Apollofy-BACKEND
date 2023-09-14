import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getUserByEmail, updateUserById } from '../controllers/';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userId', getUserByEmail)
    .get('/', getAllUsers)
    .patch('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;