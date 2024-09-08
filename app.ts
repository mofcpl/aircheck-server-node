import express, { Express, NextFunction } from "express";
import { Request, Response } from 'express';

import mongoose from 'mongoose'

import { loadAndCheckEnvironements } from "./utils/envs";
import data from './routes'
import config from './config'

const envs = loadAndCheckEnvironements();

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.use('/', data);

app.use((error: Error, _req: Request, res: Response) => {
    res.statusCode=500;
    res.send(error.message || error)
})

mongoose.connect(envs.uri, {
    authSource: config.mongoDBAuthSource,
    user: envs.user,
    pass: envs.password
})
.then(() => {
    console.log('Database connected')
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})
.catch((error) => {
    console.error(error.message)
})
