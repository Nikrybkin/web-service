'use strict';

const consumptionRatesData = require('../data/consumptionRates');

const getConsumptionsRates = async (req, res, next) => {
    try {
        const consumptionRates = await consumptionRatesData.getConsumptionsRates();
        res.send(consumptionRates);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getConsumptionRates =  async (req, res, next) => {
    try {
        const NormID = req.params.id;
        const oneConsumptionRates = await consumptionRatesData.getConsumptionRatesById(NormID);
        res.send(oneConsumptionRates)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const addConsumptionRates =  async (req, res, next) => {
    try {
        const data = req.body;
        const created = await consumptionRatesData.createConsumptionRates(data)
        res.send(created)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const updateConsumptionRates = async (req, res, next) => {
    try {
        const NormID = req.params.id;
        const data = req.body;
        const updated = await consumptionRatesData.updateConsumptionRates(NormID, data)
        res.send(updated)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteConsumptionRates = async (req, res, next) => {
    try {
        const NormID = req.params.id;
        const deleteConsumptionRates = await consumptionRatesData.deleteConsumptionRates(NormID);
        res.send(deleteConsumptionRates)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    getConsumptionsRates,
    getConsumptionRates,
    addConsumptionRates,
    updateConsumptionRates,
    deleteConsumptionRates
}