import { NextFunction, Request, Response } from "express";

import { getDataFromBuffer } from "../services";
import appConfig from "../config"
import { TimeUnit } from "../utils/enums";
import stationModel from "../models/stations";

export const getStations = (req: Request, res: Response, next: NextFunction) => {
    getDataFromBuffer(stationModel, 1, appConfig.originUri + appConfig.stationEndpoint, appConfig.expirationStations, TimeUnit.days, true)
        .then((data) => res.send(data))
        .catch((error) => next(error))
}