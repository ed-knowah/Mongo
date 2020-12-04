const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
const PORT = 4000;
const user = require('./models/user');

const db = 'mongodb://localhost/test';

(async function () {
    try {
      await mongoose.connect(db, { useNewUrlParser: true });
      return console.log(`Successfully connected to ${db}`);
    } catch (error) {
      console.log("Error connecting to database: ", error);
      return process.exit(1);
    }
  })();


app.get('/people', (req, res)=> {

    user.peopleModel.find({}, (err, foundData)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            res.send(foundData);
        }
    });
});

app.post('/people', (req, res)=> {

    const person = new user.peopleModel();// you only create instance when you want to save something
    person.name = req.body.name;
    person.age = req.body.age;
    person.sex = req.body.sex;
    person.complexion = req.body.complexion;
    person.height = req.body.height;
    person.race = req.body.race;

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
    user.peopleModel.findOneAndRemove({_id: id}, (err)=>{
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