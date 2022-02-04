import express from 'express'
import { user_products_get } from '../../controllers/userController.js';

const router = express.Router()

router.get('/:id/products',user_products_get)


export default router;