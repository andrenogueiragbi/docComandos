

const conn = require('../../src/database')
const connModals = require('../../src/modals/Activity')



module.exports = () => {
    return Promise.all(
      Object.keys(connModals.sequelize.models).map(key => {
        return connModals.sequelize.models[key].destroy({ truncate: true, force: true });
      })
    );
  };
