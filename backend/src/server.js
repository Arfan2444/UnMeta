import express from "express"
import "dotenv/config"
import User from "./models/user.model.js"
import {connectDb} from "./lib/db.js"
import http from "http";
import dns from "dns";
import {clerkMiddleware} from '@clerk/express'
import cors from "cors"
import fs from "fs"
import path from "path";
import job from "./lib/cron.js"
import clerkwebhook from "./webhooks/clerk.webhook.js"

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();
const Port = process.env.PORT;
const Frontend_Url = process.env.FRONTEND_URL;
const public_Dir = path.join(process.cwd(),"public");

app.use("/api/webhooks/clerk",express.raw({type:"application/json"}),clerkwebhook)
app.use(express.json());
app.use(cors({origin:Frontend_Url,credentials:true}));
app.use(clerkMiddleware());

app.get("/health", (req,res) => {
    res.status(200).json({ok:true})
})

if(fs.existsSync(public_Dir)){
    app.use(express.static(public_Dir))
    app.get("/{*any}",(req,res,next) => {
        res.sendFile(path.join(public_Dir,"index.html"),(err) => next(err));
    })
}

connectDb();

app.listen(Port,() => {
    console.log(`Server Listening on Port ${Port} `)
    if(process.env.NODE_ENV==="production"){
        job.start();
    }
})