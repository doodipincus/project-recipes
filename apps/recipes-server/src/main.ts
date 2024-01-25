import express from 'express';
import postgraphile from 'postgraphile';
import cors from 'cors';
import 'dotenv/config'


// config();
const app = express();

export const post = postgraphile({
  database: process.env.DATABASE_NAME,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT as unknown as number,
  ssl: true
},
  'recipes_schema',
  {
    watchPg: false,
    graphiql: true,
    enhanceGraphiql: true,
    ownerConnectionString: 'owner',
    dynamicJson: true,
    classicIds: true,
    jwtPgTypeIdentifier: "recipes_schema.token",
    jwtSecret: process.env.SECRET_KEY_TOKEN,
  }
)


app.use(express.json());
app.use(cors())
app.use(post)
  // postgraphile(
  //   process.env.URL_RENDER as string,
  //   // 'recipes_schema',
  //   'public',
  //   {
  //     watchPg: true,
  //     graphiql: true,
  //     enhanceGraphiql: true,
  //     dynamicJson:true,
  //     classicIds:true,
  //     jwtPgTypeIdentifier: "recipes_schema.token",
  //     jwtSecret:'blabla',  
  //     // retryOnInitFail: true   
  //   }
  // )
// );

app.listen(3000);
console.log(`🚀 Server ready at http://localhost:3000/`);
