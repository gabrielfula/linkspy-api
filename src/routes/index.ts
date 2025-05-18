import express from 'express';
import adminRoute from "./admin/index";
import healthcheckController from '../http/admin/controllers/healthcheck.controller';

const router = express.Router();

router.use("/admin", adminRoute);
router.get("/healthcheck", healthcheckController.check);

export default router;