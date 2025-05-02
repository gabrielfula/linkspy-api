import express from 'express';
import UrlController from "../../http/admin/controllers/url.controller";
import { AuthenticatedMiddleware } from '../../middlewares/authenticated';
import { AuthenticatedKeyMiddleware } from '../../middlewares/authenticatedKey';

const router = express.Router();

router.post('/', AuthenticatedMiddleware, UrlController.create);
router.post('/track', AuthenticatedKeyMiddleware, UrlController.track);
router.get('/list', AuthenticatedMiddleware, UrlController.list);
router.get('/recent', AuthenticatedMiddleware, UrlController.getRecentUrl);
router.get('/details/:uuid', AuthenticatedMiddleware, UrlController.details);


export default router;