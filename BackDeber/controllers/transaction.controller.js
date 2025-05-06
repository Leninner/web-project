const Transaction = require('../models/transaction.model');

exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al agregar transacción');
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener transacciones');
  }
};

exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).send('Transacción no encontrada');
    res.json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener transacción');
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).send('Transacción no encontrada');

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar transacción');
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).send('Transacción no encontrada');

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Transacción eliminada' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al eliminar transacción');
  }
};
