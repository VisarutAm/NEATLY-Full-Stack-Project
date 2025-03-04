import express from "express"
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());



app.get("/test", (req, res) => {
    return res.json("Server API is working 🚀");
  });
  
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });