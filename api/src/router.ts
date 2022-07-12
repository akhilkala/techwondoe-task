import express from "express";
import { login, register } from "./controllers/auth";
import {
  addShow,
  deleteShow,
  editShow,
  getUserShows,
} from "./controllers/shows";
import protect from "./middleware/protect";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/shows/all", protect, getUserShows);
router.post("/shows/add", protect, addShow);
router.put("/shows/edit/:id", protect, editShow);
router.delete("/shows/delete/:id", protect, deleteShow);

export default router;
