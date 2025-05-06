import express from 'express';
import { createUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/users').post(createUser);

export default router;