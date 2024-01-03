// /**
//  * This is not a production server yet!
//  * This is only a minimal backend to get started.
//  */

// import express from 'express';
// import * as path from 'path';

// const app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to recipes-server-trpc!' });
// });

// const port = process.env.PORT || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);

//         tRPC

// import { z } from 'zod';

// const appRouter = router({
//   // ...
//   userCreate: publicProcedure
//     .input(z.object({ name: z.string() }))
//     .mutation(async (opts) => {
//       const { input } = opts;
//       // Create a new user in the database
//       const user = await db.user.create(input);
//       return user;
//     }),
// });

//    עובד

// import { initTRPC } from '@trpc/server';
// import { createHTTPServer } from '@trpc/server/adapters/standalone';
// import cors from 'cors';
// import { z } from 'zod';

// const t = initTRPC.create();

// const publicProcedure = t.procedure;
// const router = t.router;

// const appRouter = router({
//   greeting: publicProcedure
//     // This is the input schema of your procedure
//     // 💡 Tip: Try changing this and see type errors on the client straight away
//     .input(
//       z
//         .object({
//           name: z.string().nullish(),
//         })
//         .nullish(),
//     )
//     .query(({ input }) => {
//    // This is what you're returning to your client
//       return {
//         text: `hello ${input?.name ?? 'world'}`,
//         personal:"Personal Message"
//         // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
//       };
//     }),
// });

// // export only the type definition of the API
// // None of the actual implementation is exposed to the client
// export type AppRouter = typeof appRouter;

// // create server
// createHTTPServer({
//   middleware: cors(),
//   router: appRouter,
//   createContext() {
//     console.log('context 3');
//     return {};
//   },
// }).listen(2022)

import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { z } from 'zod';
import cors from 'cors';
import { db } from './db';
import { publicProcedure, router } from './trpc';
import { config } from 'dotenv';
import pg from 'pg';
import {
  createUser,
  getUsers,
  updatedUser,
  deletedUser,
} from '../models/functions';
import { createTable } from '../models/userModel';
import { createTableRecipes } from '../models/recipeModel'
// import { sequelize } from '../models/seqPG';
import { Sequelize } from 'sequelize';

interface Register{
  user_name: string;
  email: string;
  password:string;
}

const { Pool } = pg;

config();
const appRouter = router({
  recipeList: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    const recipes = await db.recipe.findMany();
    //    ^?
    return recipes;
  }),
  recipeById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;
    //      ^?
    // Retrieve the user with the given ID
    const recipe = await db.recipe.findById(input);
    return recipe;
  }),
  register: publicProcedure
    .input(
      z.object({
        user_name: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const newUser = await db.recipe.register(input as Register);
      return newUser;
    }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;


export const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER  , process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect:'postgres'
 });

(async () => {
  // const pool = new Pool(); 
  // const res = await pool.connect();
  // res.release();


  // console.log(`Database connection test completed successfully`);


  await createTable();
  // await createUser();
  // await getUsers();
  // await updatedUser();
  // await deletedUser();

  createHTTPServer({
    middleware: cors(),
    router: appRouter,
    createContext() {
      console.log('context 3');
      return {};
    },
  }).listen(2022);
})();
