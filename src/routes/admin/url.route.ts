import express from 'express';
import UrlController from "../../http/admin/controllers/url.controller";

const router = express.Router();

router.post('/', UrlController.create);
router.get('/track/:id', UrlController.track);
router.get('/list', UrlController.list);


export default router;