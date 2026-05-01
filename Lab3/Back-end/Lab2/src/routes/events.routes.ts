import { Router } from "express";
import { eventsController } from "../controllers/events.controller.js";

const router = Router();

router.get("/", eventsController.getEvents);
router.get("/stats", eventsController.getStats);
router.get("/:id", eventsController.getById);
router.post("/", eventsController.create);
router.delete("/:id", eventsController.delete);

export default router;