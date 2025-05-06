const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller.controller');

router.post('/', sellerController.addSeller);
router.get('/', sellerController.getSellers);
router.put('/:id', sellerController.updateSeller);
router.delete('/:id', sellerController.deleteSeller);

module.exports = router;
