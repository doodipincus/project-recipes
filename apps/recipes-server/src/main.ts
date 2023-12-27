// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import express from 'express';
// import http from 'http';
// import cors from 'cors';
// import { typeDefs, resolvers } from './demo/graphql';

// interface MyContext {
//   token?: string;
// }

// const app = express();

// const httpServer = http.createServer(app);

// const server = new ApolloServer<MyContext>({
//   typeDefs,
//   resolvers,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
// });

// server.start().then(() => {
//   app.use(
//     '/',
//     cors<cors.CorsRequest>(),
//     express.json(),
//     expressMiddleware(server, {
//       context: async ({ req }) => ({ token: req.headers.token }),
//     })
//   );
// });

// const func = async () => {
//   await new Promise<void>((resolve) =>
//     httpServer.listen({ port: 4000 }, resolve)
//   );
// };
// func();

// console.log(`🚀 Server ready at http://localhost:4000/`);



import express from 'express';
import postgraphile from 'postgraphile';
import { config } from 'dotenv';
import cors from 'cors';


config();
const app = express();

app.use(express.json());
app.use(cors())
app.use(
  postgraphile(
    `postgres://postgres:1234@localhost:5432/project_recipes`,
    // 'public',
    'recipes_schema',
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);

app.listen(process.env.PORT || 3000);
console.log(`🚀 Server ready at http://localhost:3000/`);
