import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

export const database = new Sequelize(process.env.DATABASE_URL,{
    models: [__dirname+'/../models/**/*'],
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    }
})
