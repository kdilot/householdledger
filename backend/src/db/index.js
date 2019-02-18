require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment')
const CategorySch = require('db/model/Category')
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise

async function connect() {
    return await mongoose.connect(process.env.MLAB_MGDB_URL, { useCreateIndex: true, useNewUrlParser: true }).then(rs => {
        console.log(`Successfully connected to Mlab Mongo Db ${process.env.MLAB_MGDB_NAME}`)
    }).catch(e => {
        console.error(e)
    })

}

module.exports = {
    connect
}