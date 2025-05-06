const Offer = require('../models/offer.model');

exports.addOffer = async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.send(offer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al agregar oferta');
  }
};

exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener ofertas');
  }
};

exports.getOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).send('Oferta no encontrada');
    res.json(offer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener oferta');
  }
};

exports.updateOffer = async (req, res) => {
  try {
    let offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).send('Oferta no encontrada');

    offer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(offer);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar oferta');
  }
};

exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).send('Oferta no encontrada');

    await Offer.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Oferta eliminada' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar oferta');
  }
};
