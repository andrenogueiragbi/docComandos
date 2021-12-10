const Categories = require('../../src/modals/Categories');
require('../../src/database')

module.exports = async ()  =>{
    const category = await Categories.create({
        name: "Mysql",
    });

    return category.dataValues.id


}