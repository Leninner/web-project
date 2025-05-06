const Seller = require('../models/seller.model');

exports.addSeller = async (req, res) => {
  try {
    const seller = new Seller(req.body);
    await seller.save();
    res.json(seller);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear el vendedor');
  }
};

exports.getSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los vendedores');
  }
};

exports.updateSeller = async (req, res) => {
  try {
    let seller = await Seller.findById(req.params.id);
    if (!seller) return res.status(404).send('No encontrado');

    seller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(seller);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar');
  }
};

exports.deleteSeller = async (req, res) => {
  try {
    const seller = await Seller.findByIdAndDelete(req.params.id);
    if (!seller) return res.status(404).send('No encontrado');
    res.json({ msg: 'Vendedor eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar');
  }
};
