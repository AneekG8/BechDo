import express from 'express';
import {email_verification_post, login_get,login_post,logout_post,email_verify_post,email_verification_get, create_user_post, oAuth_post} from '../../controllers/authController.js';
import { isAuth } from '../../middlewares/isAuthenticated.js';

const router = express.Router();

router.get('/login',isAuth,login_get)
router.post('/login',login_post)
router.post('/logout',logout_post)
router.post('/signup/email_verification',email_verification_post)
router.get('/signup/email_verification',email_verification_get)
router.post('/email_verify',email_verify_post)
router.post('/signup/create_user',create_user_post)
router.post('/login/oAuth',oAuth_post)

export default router;