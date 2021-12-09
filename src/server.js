require('dotenv').config({ 
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})


const app = require("./app");

require('./database')




app.listen(process.env.PORT || 5555, () =>{
    console.log("Aplication run port 5555 \\O/.")
})