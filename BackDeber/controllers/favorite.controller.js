const Favorite = require('../models/favorite.model');

exports.addFavorite = async (req, res) => {
  try {
    const favorite = new Favorite(req.body);
    await favorite.save();
    res.send(favorite);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al agregar favorito');
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find();
    res.json(favorites);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener favoritos');
  }
};

exports.getFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) return res.status(404).send('Favorito no encontrado');
    res.json(favorite);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener el favorito');
  }
};

exports.updateFavorite = async (req, res) => {
  try {
    let favorite = await Favorite.findById(req.params.id);
    if (!favorite) return res.status(404).send('Favorito no encontrado');

    favorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(favorite);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar el favorito');
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);
    if (!favorite) return res.status(404).send('Favorito no encontrado');

    await Favorite.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Favorito eliminado' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar el favorito');
  }
};
