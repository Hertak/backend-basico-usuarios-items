const mongoose = require('mongoose');

const dbConnection = async() => {

try {
    await mongoose.connect( process.env.DB_CNN );


    console.log('DB conectada');

} catch (error) {
    console.log(error);
    throw new Error('Error al conectar con la base de datos de Mongo');
}
}


module.exports = {
    dbConnection
}