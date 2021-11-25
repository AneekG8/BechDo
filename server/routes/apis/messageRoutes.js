import express from 'express';
import { messages_product_user_get, messages_post, messages_product_get } from '../../controllers/messageController.js';

const router = express.Router()

router.get('/:product_id',messages_product_get)

router.get('/:product_id/:user_id', messages_product_user_get)

router.post('/',messages_post)

export default router;