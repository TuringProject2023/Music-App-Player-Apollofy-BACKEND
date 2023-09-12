import { Router } from "express";
import { createTrack } from "../controllers/track.controller";

const trackRoutes = Router();

trackRoutes.post("/", createTrack);

export default trackRoutes;
