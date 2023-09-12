import { Router } from "express";
import { createTrack } from "../controllers/";

const trackRoutes = Router();

trackRoutes
    .post("/", createTrack)
    .get("/track", getTrackById)
    .get("/track", getAllTracks)
    .put("/track", updateTrackById)
    .delete("/track", deleteTrackById)

export default trackRoutes;
