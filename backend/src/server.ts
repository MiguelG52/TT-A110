import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import database from "./config/db"
import userRouter from './routes/users.route';
import authRouter from './routes/auth.route';
import { limiter } from './config/limiter';

async function connectDB(){
    try{
        await database.authenticate();
        await database.sync();
        console.log('Coneccion a la bd exitosa');
    }catch(error){
        console.error('Error al conectar a la bd');
    }
}
connectDB();
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', userRouter);
app.use('/api/auth', authRouter);


export default app;