'use strict';

const typeExpenseData = require('../data/typesExpense');

const getTypesExpense = async (req, res, next) => {
    try {
        const typesExpense = await typeExpenseData.getTypesExpense();
        res.send(typesExpense);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getTypeExpense =  async (req, res, next) => {
    try {
        const ViewID = req.params.id;
        const oneTypeExpense = await typeExpenseData.getTypeExpenseById(ViewID);
        res.send(oneTypeExpense)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const addTypeExpense =  async (req, res, next) => {
    try {
        const data = req.body;
        const created = await typeExpenseData.createTypeExpense(data)
        res.send(created)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const updateTypeExpense = async (req, res, next) => {
    try {
        const ViewID = req.params.id;
        const data = req.body;
        const updated = await typeExpenseData.updateTypeExpense(ViewID, data)
        res.send(updated)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteTypeExpense = async (req, res, next) => {
    try {
        const ViewID = req.params.id;
        const deleteTypeExpense = await typeExpenseData.deleteTypeExpense(ViewID);
        res.send(deleteTypeExpense)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    getTypesExpense,
    getTypeExpense,
    addTypeExpense,
    updateTypeExpense,
    deleteTypeExpense
}