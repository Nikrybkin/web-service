'use strict';

const express = require('express');
const typeExpenseController = require('../controllers/consumptionController');
const router = express.Router();

const {getConsumptions, getConsumption, addConsumption, updateConsumption, deleteConsumption} = typeExpenseController;

router.get('/consumptions', getConsumptions)
router.get('/consumptions/:id', getConsumption)
router.post('/consumptions', addConsumption)
router.put('/consumptions/:id', updateConsumption)
router.delete('/consumptions/:id', deleteConsumption)


module.exports = {
    routes: router
}