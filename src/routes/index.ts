import express from 'express';
import adminRoute from "./admin/index";

const router = express.Router();

router.use("/admin", adminRoute);

export default router;