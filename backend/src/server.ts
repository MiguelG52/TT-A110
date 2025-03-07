import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import database from "./config/db"
import userRouter from './routes/users.route';
import authRouter from './routes/auth.route';

async function connectDB(){
    try{
        await database.authenticate();
        await database.sync({alter:true});
        console.log('Coneccion a la bd exitosa');
    }catch(error){
        console.error('Error al conectar a la bd');
    }
}
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', userRouter);
app.use('/api/auth', authRouter);


export default app;