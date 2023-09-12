import { Router } from "express";
import { createTrack, deleteTrackById, getAllTracks, getTrackById, updateTrackById } from "../controllers/";

const trackRoutes = Router();

trackRoutes
    .post("/", createTrack)
    .get("/:trackId", getTrackById)
    .get("/", getAllTracks)
    .put("/:trackId", updateTrackById)
    .delete("/:trackId", deleteTrackById)

export default trackRoutes;
