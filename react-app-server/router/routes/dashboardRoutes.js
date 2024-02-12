const express = require('express');
const dsashboardController = require('../../controller/dashboardController');
const router = express.Router();


router.get('/dashboard', dsashboardController.all)

module.exports = ()=> router