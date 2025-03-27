import * as pg from "pg";
const { Pool } = pg.default;
import 'dotenv/config'

const connectionPool = new Pool({
  connectionString: process.env.DATABASE_URL,

  user: `${process.env.DB_USERNAME}`,
  host: "localhost",
  database: "DB-Social-Question-and-Answer_Website",
  password: `${process.env.DB_PASSWORD}`,
  port: 5432,
});

console.log(process.env.DB_USERNAME, process.env.DB_PASSWORD,process.env.DATABASE_URL);

export default connectionPool;