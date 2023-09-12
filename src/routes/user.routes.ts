import { Router } from 'express';
import { createUser } from '../controllers/user.controller';


const userRoutes = Router();

userRoutes
    .post('/', createUser);

export default userRoutes;