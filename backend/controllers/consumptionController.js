'use strict';

const consumptionData = require('../data/consumptions');

const getConsumptions = async (req, res, next) => {
    try {
        const consumptions = await consumptionData.getConsumptions();
        res.send(consumptions);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getConsumption = async (req, res, next) => {
    try {
        const ExpenseID = req.params.id;
        const oneConsumption = await consumptionData.getConsumptionById(ExpenseID);
        res.send(oneConsumption)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const addConsumption =  async (req, res, next) => {
    try {
        const data = req.body;
        const created = await consumptionData.createConsumption(data)
        res.send(created)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const updateConsumption = async (req, res, next) => {
    try {
        const ExpenseID = req.params.id;
        const data = req.body;
        const updated = await consumptionData.updateConsumption(ExpenseID, data)
        res.send(updated)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteConsumption = async (req, res, next) => {
    try {
        const ExpenseID = req.params.id;
        const deleteConsumption = await consumptionData.deleteConsumption(ExpenseID);
        res.send(deleteConsumption)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    getConsumptions,
    getConsumption,
    addConsumption,
    updateConsumption,
    deleteConsumption
}

