import express, { Router } from "express";

import { getData } from "../controllers/data";
import { getSensors } from "../controllers/sensor";
import { getStations } from "../controllers/stations";
import { getSummary } from "../controllers/summary";

const router: Router = express.Router();

router.get('/data/getData/:id', getData)
router.get('/station/findAll', getStations)
router.get('/station/sensors/:id', getSensors)
router.get('/aqindex/getIndex/:id', getSummary)

export default router