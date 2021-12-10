const conn = require('../../src/database')
const connCategory = require('../../src/modals/Categories')
const connCommands = require('../../src/modals/Commands')



const dropCategory = async ()  => {
    return Promise.all(
      Object.keys(connCategory.sequelize.models).map(key => {
        return connCategory.sequelize.models[key].destroy({ truncate: true, force: true });
      }),

    );
  }

  const dropCommands = async () => {
    return Promise.all(
      Object.keys(connCommands.sequelize.models).map(key => {
        return connCommands.sequelize.models[key].destroy({ truncate: true, force: true });
      }),

    );
  }

  module.exports = {dropCategory,dropCommands }