const Categories = require('../../src/modals/Categories');
const request = require("supertest");
const { dropCategory } = require("../utils/truncate")

const app = require("../../src/app");
require('../../src/database')


//FAZ INSERTE VIA BANCO DEDADOS SQLITE E VERIFICA SE API GET VOLTA O DADO QUE FOI INSERIDO
describe(' TEST API - UNIT', () => {
    beforeEach(async () => {
        await dropCategory();
    });



    it('MAKE INSERT VIA SQLITE DATABASE AND VERIFY IF API GET RETURNS THE DATA THAT WAS INSERT', async () => {

        
        const tarefa = await Categories.create({
            name:"Huawei",
        });

        
        const response = await request(app)
            .get("/category")

        const resultData =  response.body.data;
        const data = []

        for(let i in  resultData ){
            data.push(resultData[i].name)

        }

        
        expect(data).toContain("Huawei")

    });



    //FAZ INSERTE VIA API POST E VERIFICA SE GRAVOU NO DADOS
    it('MAKE INSERT VIA POST API AND VERIFY IF IT WAS WRITTEN IN THE DATA', async () => {

        const response = await request(app)
            .post("/category")
            .send({
                name: "Linux",
            });

        const resultData = await Categories.findAll({ where: { name: "Linux" } });
        const data = []

        for(let i in resultData ){
            data.push(resultData[i].name)

        }



        expect(data).toContain('Linux')

    });


    //FAZ INSERTE VIA BANCO DE DADOS SQLITE E VERIFICA SE API DELETE APAGA DADO QUE FOI INSERIDO
    it('MAKE INSERT VIA SQLITE DATABASE AND VERIFY IF DELETE API DELETE DATA THAT WAS INSERT', async () => {

        const resultData = await Categories.create({ name: "Linux", status: false })


        const response = await request(app)
            .delete(`/category/${resultData.dataValues.id}`);

        expect(response.body.erro).toBeFalsy();

    });

    //FAZ INSERTE VIA BANCO DE DADOS SQLITE E VERIFICA SE API PUT ATUALIZOU OS DADOS
    it('MAKE INSERT VIA SQLITE DATABASE AND VERIFY IF PUT API UPDATED THE DATA', async () => {

        const resultDataID = await Categories.create({ name: "Mysql" })
        const id = resultDataID.dataValues.id

        const response = await request(app)
            .put(`/category/${id}`)
            .send({
                name: "Maria-DB",
            });

        const resultData = await Categories.findAll({ where: { id: id } });
       

        expect(resultData[0].dataValues.name).toBe('Maria-DB');
        //expect(resultData[0].dataValues.status).toBeTruthy();

    });

});
