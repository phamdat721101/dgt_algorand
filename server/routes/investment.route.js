const express = require('express');
const router =express.Router();
const investmentCtrl = require('../controllers/investment.controller');

router.route('/user_investment').get(investmentCtrl.user_investment)

module.exports = router