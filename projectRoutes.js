import express from 'express';
import {
  createProject,
} from '../controllers/projectContoller.js'
// import protect from '../middlewares/asyncHandler.js'; // This would break

const router = express.Router();

router.post("/create", createProject)


export default router;