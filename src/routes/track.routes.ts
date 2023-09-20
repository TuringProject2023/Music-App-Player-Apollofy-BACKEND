import { Router } from "express";
import { createTrack, deleteTrackById, getAllTracks, getTrackById, toggleTrackById, updateTrackById } from "../controllers/";

const trackRoutes = Router();

trackRoutes
    .post("/:userId", createTrack)
    .get("/:trackId", getTrackById)
    .get("/", getAllTracks)
    .patch("/:trackId", updateTrackById)
    .patch("/:trackId/:userId", toggleTrackById)
    .delete("/:trackId", deleteTrackById)

export default trackRoutes;
