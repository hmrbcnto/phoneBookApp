const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log("Please enter your password with the ff format: node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]
const database = 'phonebookDatabase'
const url = `mongodb+srv://hmrbcnt:${password}@fullstackopenmongodb.lqee8.mongodb.net/${database}?retryWrites=true&w=majority`


mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)


switch(process.argv.length){
    case 3:
        Person.find({}).then(result => {
            result.forEach( person => {
                console.log(person)
            })
            mongoose.connection.close()
        })
        break
    case 5:
        const newName = process.argv[3]
        const newNumber = process.argv[4]
        const person = new Person({
            name: newName,
            number: newNumber
        })

        person.save().then(result => {
            console.log("Person saved to database!")
            mongoose.connection.close()
            process.exit()
        })
        break
    default:
        console.log("There was an error, please try again.")
        process.exit(1)
}

// person.save().then(result => {
//     console.log("Person added!")
//     mongoose.connection.close()
// })

