'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getTypesExpense = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('typesExpense');
        const list = await pool.request().query(sqlQueries.typesexpenselist);
        return list.recordset;
    } catch (err) {
        return err.message;
    }
}


const getTypeExpenseById = async (ViewID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('typesExpense');
        const oneTypeExpense = await pool.request().input('ViewID', sql.Int, ViewID).query(sqlQueries.typesexpenseById)
        return oneTypeExpense.recordset;
    } catch (err) {
        return err.message
    }
}

const createTypeExpense = async (typeExpenseData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('typesExpense');
        const insertTypeExpense = await pool.request()
            .input('Name', sql.NVarChar(40), typeExpenseData.Name)
            .input('Description', sql.NVarChar(40), typeExpenseData.Description)
            .query(sqlQueries.createTypeExpense)
        return insertTypeExpense.recordset;
    } catch (err) {
        return err.message;
    }
}

const updateTypeExpense = async (ViewID, typeExpenseData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('typesExpense');
        const update = await pool.request()
            .input('ViewID', sql.Int, ViewID)
            .input('Name', sql.NVarChar(40), typeExpenseData.Name)
            .input('Description', sql.NVarChar(40), typeExpenseData.Description)
            .query(sqlQueries.updateTypeExpense)
            return update.recordset;
    } catch (err) {
        return err.message
    }
}

const deleteTypeExpense = async (ViewID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('typesExpense');
        const deleted = await pool.request()
            .input('ViewID', sql.Int, ViewID)
            .query(sqlQueries.deleteTypeExpense);
        return deleted.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getTypesExpense,
    getTypeExpenseById,
    createTypeExpense,
    updateTypeExpense,
    deleteTypeExpense
}