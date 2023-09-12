import { Router } from "express";
import { createTrack, deleteTrackById, getAllTracks, getTrackById, updateTrackById } from "../controllers/";

const trackRoutes = Router();

trackRoutes
    .post("/", createTrack)
    .get("/track", getTrackById)
    .get("/track", getAllTracks)
    .put("/track", updateTrackById)
    .delete("/track", deleteTrackById)

export default trackRoutes;
