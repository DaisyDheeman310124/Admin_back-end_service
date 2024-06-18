const NODE_ENV = process.env.NODE_ENV || 'production';
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const mongoose = require('mongoose');
const log = console.log;
global.Promise = mongoose.Promise;

function db_connect() {
    console.log(process.env.DATABASE);
    mongoose.connection.openUri(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
}
db_connect();
mongoose.set('useFindAndModify', false);
mongoose.connection.on('connected', () => {
    log(`DB connected`);
});
mongoose.connection.on('error', (error) => {
    log(`Error in DB connetcion is ${error}`);
});
mongoose.connection.on('disconnected', () => {
    db_connect();
});
