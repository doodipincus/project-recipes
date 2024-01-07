import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
import { router } from './trpc';
import 'dotenv/config'
import { createTable } from './models/userModel';
import { routerToApp } from './router';


const appRouter = router(routerToApp);

export type AppRouter = typeof appRouter;

(async () => {

  await createTable();
  console.log(`Database connection test completed successfully`);

  createHTTPServer({
    middleware: cors(),
    router: appRouter,
  }).listen(2022);
})();
