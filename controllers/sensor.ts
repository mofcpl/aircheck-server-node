import { NextFunction, Request, Response } from "express";

import appConfig from "../config"
import { getDataFromBuffer } from "../services";
import sensorsModel from "../models/sensors";
import { TimeUnit } from "../utils/enums";

export const getSensors = (req: Request, res: Response, next: NextFunction) => {
    getDataFromBuffer(sensorsModel, Number(req.params.id), appConfig.originUri + appConfig.sensorEndpoint, appConfig.expirationSensors, TimeUnit.days, false)
        .then((data) => res.send(data))
        .catch((error) => next(error))
}