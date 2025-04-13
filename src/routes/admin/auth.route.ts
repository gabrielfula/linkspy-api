import express from 'express';
import AuthController from "../../http/admin/controllers/auth.controller";

const router = express.Router();

router.post('/signin', AuthController.login);
router.post('/register', AuthController.register);


export default router;