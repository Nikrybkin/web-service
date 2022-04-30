'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getConsumptionsRates = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptionRates');
        const list = await pool.request().query(sqlQueries.consumptionrateslist);
        return list.recordset;
    } catch (err) {
        return err.message;
    }
}

const getConsumptionRatesById = async (NormID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptionRates');
        const oneConsumptionRates = await pool.request().input('NormID', sql.Int, NormID).query(sqlQueries.consumptionRatesById)
        return oneConsumptionRates.recordset;
    } catch (err) {
        return err.message
    }
}

const createConsumptionRates = async (consumptionRatesData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptionRates');
        const insertConsumptionRates = await pool.request()
            .input('DepartmentID', sql.Int, consumptionRatesData.DepartmentID)
            .input('ViewID', sql.Int, consumptionRatesData.ViewID)
            .input('Sum', sql.Int, consumptionRatesData.Sum)
            .input('Date', sql.Date, consumptionRatesData.Date)
            .query(sqlQueries.createConsumptionRates)
        return insertConsumptionRates.recordset;
    } catch (err) {
        return err.message;
    }
}

const updateConsumptionRates = async (NormID, consumptionRatesData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptionRates');
        const update = await pool.request()
            .input('NormID', sql.Int, NormID)
            .input('DepartmentID', sql.Int, consumptionRatesData.DepartmentID)
            .input('ViewID', sql.Int, consumptionRatesData.ViewID)
            .input('Sum', sql.Int, consumptionRatesData.Sum)
            .input('Date', sql.Date, consumptionRatesData.Date)
            .query(sqlQueries.updateConsumptionRates)
            return update.recordset;
    } catch (err) {
        return err.message
    }
}

const deleteConsumptionRates = async (NormID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('consumptionRates');
        const deleted = await pool.request()
            .input('NormID', sql.Int, NormID)
            .query(sqlQueries.deleteConsumptionRates);
        return deleted.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getConsumptionsRates,
    getConsumptionRatesById,
    createConsumptionRates,
    updateConsumptionRates,
    deleteConsumptionRates
}