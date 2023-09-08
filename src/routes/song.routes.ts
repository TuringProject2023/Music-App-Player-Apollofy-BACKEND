import { Router } from "express";
import { createSong } from "../controllers/song.Controller";

const songRoutes = Router();

songRoutes.post("/", createSong);

export default songRoutes;
