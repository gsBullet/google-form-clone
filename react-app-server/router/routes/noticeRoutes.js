const express = require('express');
const noticeboardController = require('../../controller/noticeboardController');

const router = express.Router();


router.post(`/create-notice/:id`,noticeboardController.create),

router.get('/all-notice',noticeboardController.all),
router.get('/get-notice',noticeboardController.show),

router.post('/update-notice',noticeboardController.update),

router.get('/delete-notice',noticeboardController.delete),


module.exports = ()=> router