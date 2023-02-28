const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.reh8ul4.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('people', noteSchema)

// Jos on syötetty pelkkä salasana, tulostetaan puhelinluettelon numerot
if (!name && !number) {
    Person.find({}).then(result => {
        console.log('Phonebook:')
        result.forEach(nimi => {
            console.log(nimi.name,nimi.number)
            mongoose.connection.close()
        })
    })
}
else {
    const numero = new Person({
        name: name,
        number: number,
    })

    // Tallennetaan nimi ja numero puhelinluetteloon
    numero.save().then(result => {
        console.log(`added ${name}number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

