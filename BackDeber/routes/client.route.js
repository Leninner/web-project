const express = require('express')
const router = express.Router() 
const clientController = require('../controllers/client.controller')

// API/api/clients
router.post('/', clientController.addClient)
router.get('/',clientController.getClients)
router.get('/:id', clientController.getClient)
router.put('/:id', clientController.updateClient)
router.delete('/:id', clientController.deleteClient)

module.exports = router 
