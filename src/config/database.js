require('dotenv').config({ 
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

/*
##TO SQLITE##
module.exports = {
    dialect: 'sqlite', 
    storage: './DB_SERVER.SQL',
    define:{
        timestamps: true,
        underscored: true,
    },
    logging: false,
};*/

/*TO POSTGRES*/
//storage: './__tests__/database.sqlite',
module.exports = {
    dialect: process.env.DB_DIALECT_TESTE || 'sqlite',
    database: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: 5432,
    storage: process.env.DB_LOCAL_TESTE || './database.sqlite',
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    define: {
        timestamps: true,
        underscored: true,
    },
    logging: false,
};
