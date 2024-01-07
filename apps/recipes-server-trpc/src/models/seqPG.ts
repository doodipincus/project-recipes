import { Sequelize } from "sequelize";
import 'dotenv/config'

export const sequelize = new Sequelize(process.env.URL_ELEPHANT as string, {
    schema:'recipes_schema',
});

// `postgres://postgres:1234@localhost:5432/project_recipes`