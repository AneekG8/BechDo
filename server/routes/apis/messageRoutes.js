import express from 'express';
import { messages_get, messages_post } from '../../controllers/messageController.js';

const router = express.Router()

router.get('/', messages_get)

router.post('/',messages_post)

export default router;