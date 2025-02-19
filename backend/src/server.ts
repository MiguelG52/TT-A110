import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {database} from "./config/db"

async function connectDB(){
    try{
        await database.authenticate();
        database.sync();
        console.log('Connection has been established successfully.');
    }catch(error){
        console.error('Unable to connect to the database:');
    }
}
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

export default app;