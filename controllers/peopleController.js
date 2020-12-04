const user = require('../models/user');

module.exports= {

    getAllPeople: async (req, res)=> {

        user.peopleModel.find({}, (err, foundData)=>{
            if(err){
                console.log(err);
                res.status(500).send();
            }else{
                res.send(foundData);
            }
        });
    },

    addPerson: async (req, res)=> {

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
    },

    deletePerson: async (req, res)=> {
        const id = req.params.id;
        user.peopleModel.findOneAndRemove({_id: id}, (err)=>{
            if(err){
                console.log(err);
                res.status(500).send();
            }
            res.write('delete successfull');
            return res.status(200).send();
        });
    }
};