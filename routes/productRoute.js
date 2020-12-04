const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const router = express.Router();
app.use(bodyParser.urlencoded({extended:true}));
const productController = require('../controllers/peopleController');


router.get('/', productController.getAllPeople);
router.post('/', productController.addPerson);
router.delete('/:id', productController.deletePerson);

module.exports ={
    router
}