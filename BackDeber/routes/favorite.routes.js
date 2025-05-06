const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');

router.post('/', favoriteController.addFavorite);
router.get('/', favoriteController.getFavorites);
router.get('/:id', favoriteController.getFavorite);
router.put('/:id', favoriteController.updateFavorite);
router.delete('/:id', favoriteController.deleteFavorite);

module.exports = router;
