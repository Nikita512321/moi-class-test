import { Router } from "express";
import lessonsController from "../controllers/lessonsController.js";
import { validateDateMiddleware } from "../middlewares/validateDate.js";
import { validateStatusMiddleware } from "../middlewares/validateStatus.js";
import { validatePageMiddleware } from "../middlewares/validatePage.js";
import { validateTeacherIdsMiddleware } from "../middlewares/validateTeacherIds.js";
import { validateStudentsCountMiddleware } from "../middlewares/validateStudentsCount.js";
import { validateLessonsPerPageMiddleware } from "../middlewares/validateLessonsPerPage.js";

const router = Router();

router.get(
  "/",
  validateDateMiddleware,
  validateStatusMiddleware,
  validatePageMiddleware,
  validateTeacherIdsMiddleware,
  validateLessonsPerPageMiddleware,
  validateStudentsCountMiddleware,
  lessonsController.getLessonsByTeacnerIds
);

export default router;
