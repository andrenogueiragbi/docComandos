const Activity = require('../../src/modals/Activity');
const request = require("supertest");
const truncate = require("../utils/truncate")

const app = require("../../src/app");
require('../../src/database')


//FAZ INSERTE VIA BANCO DEDADOS SQLITE E VERIFICA SE API GET VOLTA O DADO QUE FOI INSERIDO
describe(' TEST API CIT - UNIT', () => {
    beforeEach(async () => {
        await truncate();
    });


    it('MAKE INSERT VIA SQLITE DATABASE AND VERIFY IF API GET RETURNS THE DATA THAT WAS INSERT', async () => {
        const tarefa = await Activity.create({ name: "Atividade 01", status: false })

        const response = await request(app)
            .get("/activity")

        const resultData = response.body.data;
        const data = []

        resultData.forEach(element => {
            data.push(element.name)
        });

        expect(data).toContain('Atividade 01')

    });



    //FAZ INSERTE VIA API POST E VERIFICA SE GRAVOU NO DADOS
    it('MAKE INSERT VIA POST API AND VERIFY IF IT WAS WRITTEN IN THE DATA', async () => {

        const response = await request(app)
            .post("/activity")
            .send({
                name: "Atividade 02",
                status: true
            });

        const resultData = await Activity.findAll({ where: { name: "Atividade 02" } });
        const data = []

        resultData.forEach(element => {
            data.push(element.name)
        });

        expect(data).toContain('Atividade 02')

    });


    //FAZ INSERTE VIA BANCO DE DADOS SQLITE E VERIFICA SE API DELETE APAGA DADO QUE FOI INSERIDO
    it('MAKE INSERT VIA SQLITE DATABASE AND VERIFY IF DELETE API DELETE DATA THAT WAS INSERT', async () => {

        const resultData = await Activity.create({ name: "Atividade 03", status: false })


        const response = await request(app)
            .delete(`/activity/${resultData.dataValues.id}`);

        expect(response.body.erro).toBeFalsy();

    });

    //FAZ INSERTE VIA BANCO DE DADOS SQLITE E VERIFICA SE API PUT ATUALIZOU OS DADOS
    it('MAKE INSERT VIA SQLITE DATABASE AND VERIFY IF PUT API UPDATED THE DATA', async () => {

        const resultDataID = await Activity.create({ name: "Atividade 04", status: false })
        const id = resultDataID.dataValues.id

        const response = await request(app)
            .put(`/activity/${id}`)
            .send({
                name: "Atividade 05",
                status: true
            });

        const resultData = await Activity.findAll({ where: { id: id } });

        expect(resultData[0].dataValues.name).toBe('Atividade 05');
        expect(resultData[0].dataValues.status).toBeTruthy();

    });

});
