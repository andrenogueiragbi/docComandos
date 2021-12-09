const Commands = require('../modals/Commands');
require('dotenv').config()

module.exports = {
    async index(req, res) {

        data = await Commands.findAll({ order: [['id']]});
       

        if (data == "" || data == null) {
            return res.status(404).send({ 'message': 'Commands not found' });
        }

        return res.status(200).send({ 
            data,
         });

    },

    async store(req, res) {
        const { commands_name,make,obs,autor,category_id } = req.body;

        console.log(commands_name,make,obs,autor,category_id )

        if (!commands_name || !make || !category_id ){
            return res.status(400).send({
                erro: true,
                message: 'paramets invalid',

            });
        }

        

        data = await Commands.findOne({ where: { commands_name: commands_name } })

        if (data) {
            return res.status(400).send({
                erro: true,
                message: 'Commands already exists',
                space: data

            });
        }

        const commands = await Commands.create({ 
            commands_name,
            make,
            obs,
            autor,
            category_id
         });

        return res.status(200).send({
            erro: false,
            message: 'Categories created success',
            commands
        })

    },


    async update(req, res) {

        const { commands_name,make,obs,autor,category_id } = req.body;
        const { command_id } = req.params;
  

        const data = await Commands.findOne({ where: { id: command_id } })

        if (data == null) {
            return res.status(400).send({
                erro: true,
                message: 'Commands does not exist to update'
            });
        }

        await Commands.update({
            commands_name,
            make,
            obs,
            autor,
            category_id

        }, {
            where: {
                id: command_id,
            }
        });

        return res.status(200).send({
            erro: false,
            message: "Commands update with success"
        });

    },

    async delete(req, res) {
        const { command_id } = req.params;
        const data = await Commands.findOne({ where: { id: command_id } })

        if (data == null) {
            return res.status(400).send({
                erro: true,
                message: 'Commands does not exist to delete'
            });
        }

        await Commands.destroy({
            where: {
                id: command_id
            }
        });

        return res.status(200).send({
            erro: false,
            message: "Categories delete with success",
            deleted: data

        });

    }

};
