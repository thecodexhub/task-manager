import express from "express";
import { body } from "express-validator";

import { assignedController } from "../controllers/index/assigned";
import { backlogController } from "../controllers/index/backlog";
import { doneLatestController } from "../controllers/index/done-latest";
import { doneController } from "../controllers/index/done";
import { progressController } from "../controllers/index/progress";
import { searchController } from "../controllers/index/search";

import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

// returns the tasks that are missed
router.get("/api/v1/backlog", currentUser, requireAuth, backlogController);

// returns the tasks that are in progress
router.get("/api/v1/progress", currentUser, requireAuth, progressController);

// returns the tasks that are completed this week
router.get(
  "/api/v1/done/latest",
  currentUser,
  requireAuth,
  doneLatestController
);

// returns the tasks that are completed so far
router.get("/api/v1/done", currentUser, requireAuth, doneController);

// returns the tasks that are yet to get started
router.get("/api/v1/assigned", currentUser, requireAuth, assignedController);

// returns the tasks that matches the search-input with tasks title
router.post(
  "/api/v1/search",
  currentUser,
  requireAuth,
  [body("input").isString().withMessage("Please provide valid text")],
  validateRequest,
  searchController
);

export { router as indexRouter };
