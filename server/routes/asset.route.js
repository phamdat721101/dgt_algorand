const express = require('express');
const router =express.Router();
const assetCtrl = require('../controllers/asset.controller');

router.route('/asset').get(assetCtrl.asset)
router.route('/trade_signal').get(assetCtrl.sub_signal)

module.exports = router