const express = require('express');
const router =express.Router();
const chainCtrl = require('../controllers/chain.controller');

router.route('/algo_deposit').post(chainCtrl.algo_deposit)

module.exports = router