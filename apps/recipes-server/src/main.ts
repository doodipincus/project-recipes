import express from 'express';
import postgraphile from 'postgraphile';
import cors from 'cors';
import 'dotenv/config'


// config();
const app = express();

app.use(express.json());
app.use(cors())
app.use(
  postgraphile(
    process.env.URL_ELEPHANT as string,
    'recipes_schema',
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
      dynamicJson:true,
      classicIds:true,
    }
  )
);

app.listen(process.env.PORT || 3000);
console.log(`🚀 Server ready at http://localhost:3000/`);
