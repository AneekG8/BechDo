import express from 'express';
import {products_verification_get,product_verification_update,reports_get,report_get} from '../../controllers/adminController.js';

const router = express.Router();

router.get('/products_verification',products_verification_get)
router.put('/product_verification/:id',product_verification_update)
router.get('/reports',reports_get)
router.get('/reports/:id',report_get)

export default router;