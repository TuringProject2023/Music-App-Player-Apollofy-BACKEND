import { Router } from 'express';
<<<<<<< HEAD
import { createUser } from '../controllers/user.Controller';
=======
import { createUser } from '../controllers/';
>>>>>>> 2219bbf0ffe55159c12c5ecba5ada2173542b9e8


const userRoutes = Router();

userRoutes
    .post('/', createUser)
    .get('/:userId', getUserByEmail)
    .get('/', getAllUsers)
    .put('/:userId', updateUserById)
    .delete('/:userId', deleteUserById);

export default userRoutes;