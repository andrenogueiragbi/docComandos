const Categories = require('../modals/Categories');
require('dotenv').config()

module.exports = {
    async index(req, res) {
        data = await Categories.findAll({ order: [['id']]});
       
        if (data == "" || data == null) {
            return res.status(404).send({ 'message': 'Category not found' });
        }

        return res.status(200).send({ 
            data,
         });

    },

    async store(req, res) {
        const { name } = req.body;

        

        if (!name){
            return res.status(400).send({
                erro: true,
                message: 'paramets invalid',

            });
        }

        

        data = await Categories.findOne({ where: { name: name } })

        if (data) {
            return res.status(400).send({
                erro: true,
                message: 'Categories already exists',
                space: data

            });
        }

        const categories = await Categories.create({ name });

        return res.status(200).send({
            erro: false,
            message: 'Categories created success',
            categories
        })

    },


    async update(req, res) {
        const { name } = req.body;
        const { category_id } = req.params;
  

        data = await Categories.findOne({ where: { id: category_id } })

        if (data == null) {
            return res.status(400).send({
                erro: true,
                message: 'categories does not exist to update'
            });
        }

        await Categories.update({
            name
        }, {
            where: {
                id: category_id,
            }
        });

        return res.status(200).send({
            erro: false,
            message: "Categories update with success"
        });

    },

    async delete(req, res) {
        const { category_id } = req.params;
        const data = await Categories.findOne({ where: { id: category_id } })

        if (data == null) {
            return res.status(400).send({
                erro: true,
                message: 'Categories does not exist to delete'
            });
        }

        await Categories.destroy({
            where: {
                id: category_id
            }
        });

        return res.status(200).send({
            erro: false,
            message: "Categories delete with success",
            deleted: data

        });
    }

};
