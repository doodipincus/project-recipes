import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { createContext, router } from './trpc';
import 'dotenv/config'
import { createTableUsers } from './models/userModel';
import { usersRouter } from './router/routerUsers';
import { createTableRecipes } from './models/recipeModel';
import { createTableFestivals } from './models/festivalModal';
import { recipesRouter } from './router/routerRecipes';
import { festivalsRouter } from './router/routerFestivals';
import { createTableFavorites } from './models/favoriteResipesModel';


const appRouter = router({users: usersRouter, recipes: recipesRouter, festivals: festivalsRouter});

export type AppRouter = typeof appRouter;

(async () => {

  // await createTableUsers();
  // await createTableRecipes();
  // await createTableFestivals();
  // await createTableFavorites()
  console.log(`Database connection test completed successfully`);

  createHTTPServer({
    createContext,
    middleware: cors(),
    router: appRouter,
  }).listen(2022);
})();
