const mongoose = require('mongoose');

const peopleSchema= mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    complexion: String,
    height: Number,
    race: String
});

//this is how to define a model
const peopleModel = mongoose.model('people', peopleSchema);

module.exports= {
    peopleModel
}