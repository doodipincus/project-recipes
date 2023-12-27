import { config } from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

config();
export interface Recipes {
  recipe_id: string;
  title: string;
  category: string;
  sensitivity: string;
  creator: string;
  rating: number;
  country_of_origin: string;
  difficulty: string;
  image: string;
  ingredients: string[];
  instructions: string;
  preparation_time: string;
}

// Imaginary database
export const db = {
  recipe: {
    findMany: async () => {
      const query = 'SELECT * FROM recipes';
      const { rows } = await sendQueryToDatabase(query);
      console.log(rows);
      if (rows) return rows;
    },

    findById: async (id: string) => {
      const query = `SELECT * FROM recipes WHERE recipe_id = $1`;
      const values = [id];
      const { rows } = await sendQueryToDatabase(query, values);
      console.log('rows', rows);
      if (rows) return rows;
    },
  },
};

const sendQueryToDatabase = async (
  query: string,
  values?: any[]
): Promise<any> => {
  const pool = new Pool();
  const res = await pool.connect();
  const data = await res.query(query, values).catch((err) => console.log(err));
  res.release();
  return data;
};
