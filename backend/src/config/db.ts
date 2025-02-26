import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres',
    models: [__dirname+'/../models/**/*.model.ts'],
    dialectOptions:{
        ssl: {
            require: false,
            rejectUnauthorized: false,
        },
    }
})

export default sequelize;