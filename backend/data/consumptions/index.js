'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getConsumptions = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptions');
        const list = await pool.request().query(sqlQueries.consumptionlist);
        return list.recordset;
    } catch (err) {
        return err.message;
    }
}

const getConsumptionById = async (ExpenseID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptions');
        const oneConsumption = await pool.request().input('ExpenseID', sql.Int, ExpenseID).query(sqlQueries.consumptionById)
        return oneConsumption.recordset;
    } catch (err) {
        return err.message
    }
}

const createConsumption = async (consumptionData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptions');
        const insertConsumption = await pool.request()
            .input('ViewID', sql.Int, consumptionData.ViewID)
            .input('WorkerID', sql.Int, consumptionData.WorkerID)
            .input('Date', sql.Date, consumptionData.Date)
            .input('Sum', sql.Int, consumptionData.Sum)
            .query(sqlQueries.createConsumption)
        return insertConsumption.recordset;
    } catch (err) {
        return err.message;
    }
}

const updateConsumption = async (ExpenseID, consumptionData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptions');
        const update = await pool.request()
            .input('ExpenseID', sql.Int, ExpenseID)
            .input('ViewID', sql.Int, consumptionData.ViewID)
            .input('WorkerID', sql.Int, consumptionData.WorkerID)
            .input('Date', sql.Date, consumptionData.Date)
            .input('Sum', sql.Int, consumptionData.Sum)
            .query(sqlQueries.updateConsumption)
            return update.recordset;
    } catch (err) {
        return err.message
    }
}

const deleteConsumption = async (ExpenseID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptions');
        const deleted = await pool.request()
            .input('ExpenseID', sql.Int, ExpenseID)
            .query(sqlQueries.deleteConsumption);
        return deleted.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getConsumptions,
    getConsumptionById,
    createConsumption,
    updateConsumption,
    deleteConsumption
}