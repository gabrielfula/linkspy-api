import express from 'express';
import authRoute from "./auth.route";
import urlRoute from "./url.route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/url", urlRoute);

export default router;