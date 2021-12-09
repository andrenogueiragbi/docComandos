const Activity = require('../../src/modals/Activity');
const truncate = require("../utils/truncate")

const app = require("../../src/app");
require('../../src/database')


describe('TEST API CIT - INTEGRATION', () => {

    beforeEach(async () => {
        await truncate();
      });



    it('TEST SAVES DATABASE DATA', async () => {
        const tarefa = await Activity.create({ name: "Atividade 01", status: false })
        expect(tarefa.name).toBe('Atividade 01');

    });

    it('TEST DELETE DATABASE DATA', async () => {

        await Activity.create({ name: "Atividade 01", status: false })
        const dataDelete = await Activity.destroy({
            where: {
                name: "Atividade 01"
            }
        });

        expect(dataDelete).toEqual(expect.any(Number));

    });

    it('TEST UPDATE DATA', async () => {
        const data = await Activity.create({ name: "Atividade 01", status: false })
        const dataInsert = data.dataValues.name


        const dataUpdate = await Activity.update({
            name: "Atividade new"
        }, {
            where: {
                name: dataInsert,
            }
        });

        expect(dataUpdate[0]).toEqual(1);
    });

});
