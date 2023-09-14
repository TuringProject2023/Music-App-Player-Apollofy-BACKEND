import { Router } from 'express';
import { createUser, deleteUserById, getAllUsers, getUserByEmail, updateUserById } from '../controllers/';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userEmail', getUserByEmail)
    .get('/', getAllUsers)
    .put('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;