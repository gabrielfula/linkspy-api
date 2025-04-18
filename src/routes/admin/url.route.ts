import express from 'express';
import UrlController from "../../http/admin/controllers/url.controller";
import { AuthenticatedMiddleware } from '../../middlewares/authenticated';

const router = express.Router();

router.post('/', AuthenticatedMiddleware, UrlController.create);
router.post('/track', UrlController.track);
router.get('/list', AuthenticatedMiddleware, UrlController.list);
router.get('/recent', AuthenticatedMiddleware, UrlController.getRecentUrl);


export default router;