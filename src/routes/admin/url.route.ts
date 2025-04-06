import express from 'express';
import UrlController from "../../http/admin/controllers/url.controller";

const router = express.Router();

router.post('/', UrlController.create);
router.post('/track/:track_code', UrlController.track);
router.get('/list', UrlController.list);
router.get('/recent', UrlController.getRecentUrl);


export default router;