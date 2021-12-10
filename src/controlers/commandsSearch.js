const Commands = require('../modals/Commands');
const { Op } = require("sequelize");


module.exports = {
    async search(req, res) {
        const { commands_name, make, category_id, id } = req.query
        if (id) {
            data = await Commands.findOne({ where: { id: id } })

            return res.status(200).send({
                erro: false,
                data
            });

        } else if (commands_name) {
            data = await Commands.findAll({
                where: {
                    commands_name: {
                        [Op.substring]: [commands_name],
                    }
                }
            });

            return res.status(200).send({
                erro: false,
                data
            });

        } else if (make) {
            data = await Commands.findAll({
                where: {
                    make: {
                        [Op.substring]: [make],

                    }
                }
            });

            return res.status(200).send({
                erro: false,
                data
            });

        } else if (category_id) {
            data = await Commands.findAll({
                where: {
                    category_id: {
                        [Op.substring]: [category_id],

                    }
                }
            });

            return res.status(200).send({
                erro: false,
                data
            });

        } else {
            return res.status(400).send({
                erro: true,
                message: "Invalid parameter",
            });
        }

    }
}
