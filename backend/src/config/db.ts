import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const sequelize = new Sequelize('tta110_dev', 'postgres', 'mik3123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    models: [path.join(__dirname + '/../models/**/*.model.ts')],
    logging: false,
})

export default sequelize;