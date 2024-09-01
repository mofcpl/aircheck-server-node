import express, { Express, NextFunction } from "express";
import { Request, Response } from 'express';

import mongoose from 'mongoose'
import 'dotenv/config'

import data from './routes'
import config from './config'

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.use('/', data);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.statusCode=500;
    res.send(error.message || error)
})

if(process.env.DATABASE_URI && process.env.DATABASE_USER && process.env.DATABASE_PASSWORD) {
    mongoose.connect(process.env.DATABASE_URI, {
        authSource: config.mongoDBAuthSource,
        user: process.env.DATABASE_USER,
        pass: process.env.DATABASE_PASSWORD
    })
    .then(() => {
        console.log('Database connected')
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error.message)
    })
} else {
    console.log("Some environment variables is missing")
}