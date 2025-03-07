import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize('tta110_dev','postgres','mik3123', {
    host: 'localhost',
    dialect: 'postgres',
    models: [__dirname+'/../models/**/*.model.ts'],
    logging: false,
})

export default sequelize;