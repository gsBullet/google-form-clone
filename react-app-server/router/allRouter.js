const express = require('express');
const router = express.Router();
const homeRoutes = require('./routes/homeRouter');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRouter = require('./routes/authRouter');
const noticeRoutes = require('./routes/noticeRoutes');
const answerRoutes = require('./routes/answerRoutes');

router.use(homeRoutes());
router.use(authRouter())
router.use(dashboardRoutes())
router.use(noticeRoutes())
router.use(answerRoutes())


module.exports = () => router;