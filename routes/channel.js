'use strict';
import express from 'express';
import channel from '../controllers/channel';

const router = express.Router();

router.get('/getChannels', channel.getChannels);

export default router;