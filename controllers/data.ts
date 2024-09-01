import { NextFunction, Request, Response } from "express";

import dataModel from "../models/data";
import { TimeUnit } from "../utils/enums";
import { getDataFromBuffer } from "../services";
import appConfig from "../config"

export const getData = (req: Request, res: Response, next: NextFunction) => {
    getDataFromBuffer(dataModel, Number(req.params.id), appConfig.originUri + appConfig.dataEndpoint, appConfig.expirationData, TimeUnit.minutes, false)
        .then((data) => res.send(data))
        .catch((error) => next(error))
}

