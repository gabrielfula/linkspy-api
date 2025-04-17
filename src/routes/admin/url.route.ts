import express from 'express';
import UrlController from "../../http/admin/controllers/url.controller";
import { AuthenticatedMiddleware } from '../../middlewares/authenticated';

const router = express.Router();

router.use(AuthenticatedMiddleware);

router.post('/', UrlController.create);
router.post('/track', UrlController.track);
router.get('/list', UrlController.list);
router.get('/recent', UrlController.getRecentUrl);


export default router;