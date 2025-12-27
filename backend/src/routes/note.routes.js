import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNotesById
} from "../controllers/note.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { get } from "mongoose";

const router = express.Router();

router.use(protect);

router.post("/", createNote);
router.get("/", getNotes);
router.get("/:id", getNotesById);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

