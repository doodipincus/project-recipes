import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { createContext, router } from './trpc';
import 'dotenv/config';
import { createTableUsers } from './models/userModel';
import { usersRouter } from './router/routerUsers';
import { createTableRecipes } from './models/recipeModel';
import { createTableFestivals } from './models/festivalModal';
import { recipesRouter } from './router/routerRecipes';
import { festivalsRouter } from './router/routerFestivals';
import { createTableFavorites } from './models/favoriteResipesModel';
import ws from 'ws';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { favoritesRouter } from './router/routerFavorites';

const appRouter = router({
  users: usersRouter,
  recipes: recipesRouter,
  festivals: festivalsRouter,
  favorites: favoritesRouter,
});

export type AppRouter = typeof appRouter;

(async () => {
  // await createTableUsers();
  // await createTableRecipes();
  // await createTableFestivals();
  // await createTableFavorites()

  // createTableUsers();
  // createTableRecipes();
  // createTableFestivals();
  // createTableFavorites()
  // console.log(`Database connection test completed successfully`);

  // const ourServer = createHTTPServer({
  //   middleware: cors(),
  //   router: appRouter,
  //   createContext,
  // })

  // applyWSSHandler({
  //   wss: new ws.Server(ourServer),
  //   router: appRouter,
  //   createContext,
  // })

  //   createHTTPServer({
  //     createContext,
  //     middleware: cors(),
  //     router: appRouter,
  //   }).listen(2022);

  const ourServer = createHTTPServer({
    middleware: cors(),
    router: appRouter,
    createContext,
  });

  applyWSSHandler({
    wss: new ws.Server(ourServer),
    router: appRouter,
    createContext,
  });

  console.log('server is up on port 2022');
  ourServer.listen(2022);
})();
