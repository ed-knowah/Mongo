const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
const peopleController = require('../controllers/peopleController');


router.get('/', peopleController.getAllPeople);
router.post('/', peopleController.addPerson);
router.delete('/:id', peopleController.deletePerson);

module.exports ={
    router
}