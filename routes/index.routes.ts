import express from "express";
import { assignedController } from "../controllers/index/assigned";

import { backlogController } from "../controllers/index/backlog";
import { doneLatestController } from "../controllers/index/done-latest";
import { doneController } from "../controllers/index/done";
import { progressController } from "../controllers/index/progress";
import { searchController } from "../controllers/index/search";

const router = express.Router();

// returns the tasks that are missed
router.get("/api/v1/backlog", backlogController);

// returns the tasks that are in progress
router.get("/api/v1/progress", progressController);

// returns the tasks that are completed this week
router.get("/api/v1/done/latest", doneLatestController);

// returns the tasks that are completed so far
router.get("/api/v1/done", doneController);

// returns the tasks that are yet to be completed
router.get("/api/v1/assigned", assignedController);

// returns the tasks that matches the search-input with tasks title
router.post("/api/v1/search", searchController);

export { router as indexRouter };
