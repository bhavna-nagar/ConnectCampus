import express from "express";
import Connection from "./database/db.js";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import Router from "./routes/route.js";
import cors from 'cors';




const app=express();
const PORT=8000;
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',Router);

app.listen(PORT,()=>{console.log(`server is running successfully on  port  ${PORT}`)});

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;
Connection(USERNAME,PASSWORD);

