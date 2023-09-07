import { Router } from 'express';
import { createUser } from '../controllers/user.Controller';


const userRoutes = Router();

userRoutes
    .post('/', createUser);

export default userRoutes;