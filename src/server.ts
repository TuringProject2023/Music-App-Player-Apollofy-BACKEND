import cors from 'cors';
import express, { Express } from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import morgan from 'morgan';
import userRoutes from './routes/user.routes';



const app: express.Application = express();


app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}));


app.use('/user', userRoutes);


export default app;