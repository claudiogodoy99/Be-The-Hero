const connection = require('../database/connection');

module.exports = {
    async Index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        response.header('X-Total-Count', count['count(*)']);

        return response.json(await connection('incidents')
            .join('ongs', 'ongs.id' , '=', 'incidents.ong_id')
            .limit(5)
            .offset((page-1)*5)
            .select([
                'incidents.*',
                'ongs.nome',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'])
            );
           
    },

    async Delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incidente = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incidente.ong_id != ong_id)
            return response.status(401).json({ erro: "não autorizado" });


        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },

    async Create(request, response) {

        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
        const [id] = await connection("incidents").insert({
            title,
            description,
            value,
            ong_id
        });

        return response.status(201).json({ id });
    }
}