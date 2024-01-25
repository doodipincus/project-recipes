import { Sequelize } from "sequelize";
import 'dotenv/config'

// export const sequelize = new Sequelize(process.env.URL_ELURL_RENDEREPHANT as string, {
//     schema:'recipes_schema',
// });

export const sequelize = new Sequelize(process.env.URL_RENDER as string, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
// `postgres://postgres:1234@localhost:5432/project_recipes`