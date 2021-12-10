const Commands = require('../../src/modals/Commands');
const Categories = require('../../src/modals/Categories');
const request = require("supertest");
const { dropCommands } = require("../utils/truncate");
const delay = require('../utils/delay');
const id = require('../utils/ReturnId');

const app = require("../../src/app");
require('../../src/database')


//FAZ INSERTE VIA BANCO DEDADOS SQLITE E VERIFICA SE API GET VOLTA O DADO QUE FOI INSERIDO
describe(' TEST API - UNIT', () => {
    beforeEach(async () => {
        await delay(1000);
        await dropCommands();
        
    });




    it('COMMANDS => MAKE INSERT VIA SQLITE DATABASE AND VERIFY IF API GET RETURNS THE DATA THAT WAS INSERT', async () => {

 

        const commands = await Commands.create({
            commands_name: "drop table",
            make: "apagar tabela",
            obs: "teste",
            autor: "André",
            category_id: await id()
        });

        await delay(3000);


        

        const response = await request(app).get("/command");
  

        

        const resultData = await response.body.data;




        const data = []

        for (let i in resultData) {
            data.push(resultData[i].commands_name)
        }

        expect(data).toContain("drop table")

    });

    
    
        //FAZ INSERTE VIA API POST E VERIFICA SE GRAVOU NO DADOS
        it('MAKE INSERT VIA POST API AND VERIFY IF IT WAS WRITTEN IN THE DATA', async () => {

            const category = await Categories.create({
                name: "Mysql",
            });
    
            const response = await request(app)
                .post("/command")
                .send({
                    commands_name: "ls -lha",
                    make: "listar",
                    obs: "teste",
                    autor: "André",
                    category_id: await id()
                });
    
            const resultData = await Commands.findAll({ where: { commands_name: "ls -lha" } });
            const data = []
    
            resultData.forEach(element => {
                data.push(element.commands_name)
            });
    
            expect(data).toContain('ls -lha')
    
        });
    
   
        //FAZ INSERTE VIA BANCO DE DADOS SQLITE E VERIFICA SE API DELETE APAGA DADO QUE FOI INSERIDO
        it('MAKE INSERT VIA SQLITE DATABASE AND VERIFY IF DELETE API DELETE DATA THAT WAS INSERT', async () => {
    
            const resultData = await Commands.create({
                commands_name: "drop table",
                make: "apagar tabela",
                obs: "teste",
                autor: "André",
                category_id: await id()
            });
    
    
            const response = await request(app)
                .delete(`/command/${resultData.dataValues.id}`);
    
            expect(response.body.erro).toBeFalsy();
    
        });

        //FAZ INSERTE VIA BANCO DE DADOS SQLITE E VERIFICA SE API PUT ATUALIZOU OS DADOS
        it('MAKE INSERT VIA SQLITE DATABASE AND VERIFY IF PUT API UPDATED THE DATA', async () => {
            
            
            const resultDataID = await Commands.create({
                commands_name: "drop table",
                make: "apagar tabela",
                obs: "teste",
                autor: "André",
                category_id: await id()
            });



    
            const idSearch = resultDataID.dataValues.id
    
            const response = await request(app)
                .put(`/command/${idSearch}`)
                .send({
                    commands_name: "new drop table",
                    make: "apagar tabela",
                    obs: "teste",
                    autor: "André",
                    category_id: await id()
                });


            const resultData = await Commands.findAll({ where: { id: idSearch } });

      
            expect(resultData[0].dataValues.commands_name).toBe('new drop table');
            //expect(resultData[0].dataValues.status).toBeTruthy();
    
        });

});
