import express from "express";

import { createController } from "../controllers/tasks/create";
import { showAllController } from "../controllers/tasks/show-all";
import { showController } from "../controllers/tasks/show";
import { updateController } from "../controllers/tasks/update";
import { deleteController } from "../controllers/tasks/delete";

const router = express.Router();
const tasksUrl = "/api/v1/tasks";

// Create a new Task
router.post(tasksUrl, createController);

// Show all tasks
router.get(tasksUrl, showAllController);

// Show a single task
router.get(`${tasksUrl}/:id`, showController);

// Update a single task
router.patch(`${tasksUrl}/:id`, updateController);

// Delete a single task
router.delete(`${tasksUrl}/:id`, deleteController);

export { router as tasksRouter };
