'use strict';

const express = require('express');
const consumptionRatesController = require('../controllers/consumptionRatesController')
const router = express.Router();

const {getConsumptionsRates, getConsumptionRates, addConsumptionRates, updateConsumptionRates, deleteConsumptionRates} = consumptionRatesController;

router.get('/consumptionsRates', getConsumptionsRates)
router.get('/consumptionsRates/:id', getConsumptionRates)
router.post('/consumptionsRates', addConsumptionRates)
router.put('/consumptionsRates/:id', updateConsumptionRates)
router.delete('/consumptionsRates/:id', deleteConsumptionRates)



module.exports = {
    routes: router
}