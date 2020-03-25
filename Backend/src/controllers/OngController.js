
const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async Index (requeste,response)  {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    async Create (request,response) {
        
        const {nome, email,whatsapp,city,uf} = request.body;

        const id  = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf
        })
        
        return response.status(201).json({id});
    }
}