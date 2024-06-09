import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import corsOptions from "./config/corsOption.mjs";
import connectDB from "./config/DBconnect.mjs";
import path from "path";
import { fileURLToPath } from 'node:url';
import routes from "./routes/index.mjs"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
configDotenv();

const PORT = process.env.PORT || 3500;

connectDB();

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

app.use('/' , express.static(path.join(__dirname , 'public')));

app.get('^/$|/index(.html)?' , (req , res) => {
  res.sendFile(path.join(__dirname  , 'views' , 'index.html'))
})

app.use(routes);


app.all('*' , (req , res) => {
  res.status(404);
  if(req.accepts('html')){
    res.sendFile(path.join(__dirname , 'views' , '404.html'))
  }else if(req.accepts('json')){
    res.json({message : '404 Not Found'})
  }else {
    res.type('txt').send('404 Not Found')
  }
})

mongoose.connection.once('open' , () => {
  console.log('Connected to mongoDB')
  app.listen(PORT , () => console.log(`server running on port ${PORT}`));
})

mongoose.connection.on('error' , (err) => {
  console.log(err); 
})

