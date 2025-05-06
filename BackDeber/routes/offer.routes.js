const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offer.controller');

router.post('/', offerController.addOffer);
router.get('/', offerController.getOffers);
router.get('/:id', offerController.getOffer);
router.put('/:id', offerController.updateOffer);
router.delete('/:id', offerController.deleteOffer);

module.exports = router;
