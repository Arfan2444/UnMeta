import express from "express"
import "dotenv/config"
import User from "./models/user.model.js"
import {connectDb} from "./lib/db.js"
import http from "http";
import dns from "dns";
import {clerkMiddleware} from '@clerk/express'
import cors from "cors"

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const Port = process.env.PORT;
const Frontend_Url = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors({origin:Frontend_Url,credentials:true}));
app.use(clerkMiddleware());

app.get("/health", (req,res) => {
    res.status(200).json({ok:true})
})

connectDb();

app.listen(Port,() => {
    console.log(`Server Listening on Port ${Port} `)
})