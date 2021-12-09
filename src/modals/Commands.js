const { Model, DataTypes } = require('sequelize');

class Commands extends Model {
    static init(sequelize){
        super.init({
            commands_name: DataTypes.STRING,
            make:DataTypes.STRING,  
            obs:DataTypes.STRING,
            autor:DataTypes.STRING,
            category_id: DataTypes.INTEGER,
        }, {sequelize})
    } static associate(models) {
        this.hasMany(models.Categories, { foreignKey: 'id', as: 'categories' });
        
        
    }
}
module.exports = Commands