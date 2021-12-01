import express from "express";
import { body } from "express-validator";

import { createController } from "../controllers/tasks/create";
import { showAllController } from "../controllers/tasks/show-all";
import { showController } from "../controllers/tasks/show";
import { updateController } from "../controllers/tasks/update";
import { deleteController } from "../controllers/tasks/delete";

import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();
const tasksUrl = "/api/v1/tasks";

// Create a new Task
router.post(
  tasksUrl,
  currentUser,
  requireAuth,
  [
    body("title")
      .isLength({ min: 5, max: 20 })
      .withMessage("Please enter a title that contains 5 to 20 characters"),
    body("description")
      .optional()
      .isString()
      .withMessage(
        "This descripton is not valid. Please either remove it or enter valid text"
      ),
    body("startTime")
      .exists()
      .isISO8601()
      .toDate()
      .withMessage("Please provide a valid start time"),
    body("finishTime")
      .exists()
      .isISO8601()
      .toDate()
      .withMessage("Please provide a valid end time"),
  ],
  validateRequest,
  createController
);

// Show all tasks
router.get(tasksUrl, currentUser, requireAuth, showAllController);

// Show a single task
router.get(`${tasksUrl}/:id`, currentUser, requireAuth, showController);

// Update a single task
router.patch(
  `${tasksUrl}/:id`,
  currentUser,
  requireAuth,
  [
    body("title")
      .optional()
      .isLength({ min: 5, max: 20 })
      .withMessage("Please provide a title that contains 5 to 20 characters"),
    body("description")
      .optional()
      .isString()
      .withMessage(
        "This descripton is not valid. Please either remove it or enter valid text"
      ),
    body("startTime")
      .optional()
      .exists()
      .isISO8601()
      .toDate()
      .withMessage("Please provide a valid start time"),
    body("finishTime")
      .optional()
      .exists()
      .isISO8601()
      .toDate()
      .withMessage("Please provide a valid end time"),
  ],
  validateRequest,
  updateController
);

// Delete a single task
router.delete(`${tasksUrl}/:id`, currentUser, requireAuth, deleteController);

export { router as tasksRouter };
