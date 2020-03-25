const connection = require('../database/connection');

module.exports = {
    async Create(request, response) {
        const { id } = request.body;
        
        const ong = await connection('ongs')
            .where('id', id)
            .select('nome')
            .first();

        if(!ong)
        {
            return response.status(403).json({erro: "Nenhuma ong encontrada com esse id"});
        }

        return response.json(ong);
    }
}