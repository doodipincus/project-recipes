// import { createHTTPServer } from '@trpc/server/adapters/standalone';
// import { z } from 'zod';
// import { db } from './db';
// import { publicProcedure, router } from './trpc';

// const appRouter = router({
//   userList: publicProcedure.query(async () => {
//     // Retrieve users from a datasource, this is an imaginary database
//     const users = await db.users.findMany();
//     //    ^?
//     return users;
//   }),
//   userById: publicProcedure.input(z.string()).query(async (opts) => {
//     const { input } = opts;
//     //      ^?
//     // Retrieve the user with the given ID
//     const user = await db.users.findById(input);
//     return user;
//   }),

// });

// Export type router type signature,
// NOT the router itself.
// export type AppRouter = typeof appRouter;

// const server = createHTTPServer({
//   router: appRouter,
// });

// server.listen(3000);







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
//       // This is what you're returning to your client
//       return {
//         text: `hello ${input?.name ?? 'world'}`,
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
// }).listen(2022);