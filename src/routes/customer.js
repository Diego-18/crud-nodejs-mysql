const express = require('express'); //importing express
const router = express.Router();    //importing router

const customerController = require('../controllers/customerController.js'); 

router.get('/', customerController.list); //list all customers

router.post('/add', customerController.save); //add a new customer

router.get('/delete/:id', customerController.delete); //delete a customer

router.get('/update/:id', customerController.edit); //edit a customer

router.post('/update/:id', customerController.update); //update a customer

module.exports = router; //export the router