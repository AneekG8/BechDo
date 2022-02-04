import express from 'express';
import multer from '../../utils/multer.js';
import { products_get, products_sell_post, product_delete, product_get,product_report } from '../../controllers/productController.js';

const router = express.Router();

router.get('/',products_get);
router.get('/:id',product_get);
router.delete('/:id',product_delete)
router.post('/:id/report',product_report)
router.post('/sell',multer.array('images'),products_sell_post);


export default router;