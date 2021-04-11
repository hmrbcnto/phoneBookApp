const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGO_URI

console.log("connecting to ", url)

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(response => {
    console.log("Connected to Mongo")
}).catch(error => {
    console.log("Could not connect to mongo. Error: ", error.message)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})



module.exports = mongoose.model('Person', personSchema)
