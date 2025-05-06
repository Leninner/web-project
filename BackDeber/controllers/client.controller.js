const Client = require('../models/client.model')

exports.addClient = async(req, res) => {
    try {
        let client
        client = new Client(req.body)
        await client.save()
        res.send(client)
    }
    catch(error){
        console.log(error)
        res.status(500).send('Existe un problema en el registro del cliente')
    }
}

exports.getClients = async(req, res) => {
    try {
        const clients = await Client.find()
        console.log(clients)
        res.json(clients)
    }
    catch(error){
        console.log(error)
        res.status(500).send('Existe un problema al cargar los clientes')
    }
}


exports.getClient = async(req, res) => {
    try {
        let client = await Client.findById(req.params.id)
        if(!client){
            res.status(404).send('El cliente no existe')
        }
        res.json(client)
    }
    catch(error){
        console.log(error)
        res.status(500).send('Existe un problema al cargar el cliente')
    }
}
exports.updateClient = async(req, res) =>{
    try {
        const {dni,firstname, lastname, address,phone} = req.body
        let client = await Client.findById(req.params.id)
        if(!client){
            res.status(404).send('El cliente no existe')
        }
        client.dni = dni
        client.firstname = firstname
        client.lastname = lastname
        client.address = address
        client.phone = phone

        client = await Client.findOneAndUpdate({_id:req.params.id},client,{new:true})
        res.json(client)
    }
    catch(error){
        console.log(error)
        res.status(500).send('Existe un problema al actualizar el cliente')
    }
}
exports.deleteClient = async(req,res)=>{
    try {
        let client = await Client.findById(req.params.id)
        if(!client){
            res.status(404).send('El cliente no existe')
        }
        await Client.findOneAndDelete({_id:req.params.id})
        res.json({msg:'Cliente Eliminado'})
    }catch(error){
        console.log(error)
        res.status(500).send('Existe un problema al eliminar el cliente')
    }
}

