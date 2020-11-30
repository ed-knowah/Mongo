const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const PORT = 4000;

mongoose.connect('mongodb://localhost/test');

// a schema describes an object
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

app.get('/people', (req, res)=> {

    peopleModel.find({}, (err, foundData)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            res.send(foundData);
        }
    });


});

app.post('/people', (req, res)=> {
    const name = req.body.name;
    const age = req.body.age;
    const sex = req.body.sex;
    const complexion = req.body.complexion;
    const height = req.body.height;
    const race = req.body.race;

    const person = new peopleModel();// you only create instance when you want to save something
    person.name = name;
    person.age = age;
    person.sex= sex;
    person.complexion = complexion;
    person.height = height;
    person.race = race;

    person.save((err, savedObject)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            res.send(savedObject);
        }
    });
});

app.delete('/people/:id', (req, res)=> {
    const id = req.params.id;
    peopleModel.findOneAndRemove({_id: id}, (err)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }
        res.write('delete successfull');
        return res.status(200).send();
    });
  
});

app.listen(PORT, ()=>{
    console.log(`Your server started on port ${PORT}...`);
});