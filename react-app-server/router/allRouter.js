const express = require('express');
const router = express.Router();
const homeRoutes = require('./routes/homeRouter');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRouter = require('./routes/authRouter');
const noticeRoutes = require('./routes/noticeRoutes');

router.use(homeRoutes());
router.use(authRouter())
router.use(dashboardRoutes())
router.use(noticeRoutes())


module.exports = router