import { NextFunction, Request, Response } from "express";

import appConfig from "../config"
import { getDataFromBuffer } from "../services";
import summaryModel from "../models/summaries";
import { TimeUnit } from "../utils/enums";

export const getSummary = (req: Request, res: Response, next: NextFunction) => {
    getDataFromBuffer(summaryModel, Number(req.params.id), appConfig.originUri + appConfig.summaryEndpoint, appConfig.expirationSummary, TimeUnit.days, false)
        .then((data) => res.send(data))
        .catch((error) => next(error))
}