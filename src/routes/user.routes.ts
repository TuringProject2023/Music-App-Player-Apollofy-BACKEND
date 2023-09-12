import { Router } from 'express';
import { createUser } from '../controllers/';


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userId', getUserByEmail)
    .get('/', getAllUsers)
    .put('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;