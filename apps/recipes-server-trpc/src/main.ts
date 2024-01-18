import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { router } from './trpc';
import 'dotenv/config'
import { createTableUsers } from './models/userModel';
import { routerToApp } from './router';
import { createTableRecipes } from './models/recipeModel';
import { createTableFestivals } from './models/festivalModal';


const appRouter = router(routerToApp);

export type AppRouter = typeof appRouter;

(async () => {

  await createTableUsers();
  await createTableRecipes();
  await createTableFestivals();
  console.log(`Database connection test completed successfully`);

  createHTTPServer({
    middleware: cors(),
    router: appRouter,
  }).listen(2022);
})();
