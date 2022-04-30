'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getWorkers = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('workers');
        const list = await pool.request().query(sqlQueries.workerslist);
        return list.recordset;
    } catch (err) {
        return err.message;
    }
}

const getWorkerById = async (WorkerID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('workers');
        const oneWorker = await pool.request().input('WorkerID', sql.Int, WorkerID).query(sqlQueries.workerById)
        return oneWorker.recordset;
    } catch (err) {
        return err.message
    }
}

const createWorker = async (workerData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('workers');
        const insertWorker = await pool.request()
            .input('Surname', sql.NVarChar(40), workerData.Surname)
            .input('Name', sql.NVarChar(40), workerData.Name)
            .input('Patronymic', sql.NVarChar(40), workerData.Patronymic)
            .input('Position', sql.NVarChar(40), workerData.Position)
            .input('Experience', sql.Int, workerData.Experience)
            .input('DepartmentID', sql.Int, workerData.DepartmentID)
            .query(sqlQueries.createWorker)
        return insertWorker.recordset;
    } catch (err) {
        return err.message;
    }
}
const updateWorker = async (WorkerID, workerData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('workers');
        const update = await pool.request()
            .input('WorkerID', sql.Int, WorkerID)
            .input('Surname', sql.NVarChar(40), workerData.Surname)
            .input('Name', sql.NVarChar(40), workerData.Name)
            .input('Patronymic', sql.NVarChar(40), workerData.Patronymic)
            .input('Position', sql.NVarChar(40), workerData.Position)
            .input('Experience', sql.Int, workerData.Experience)
            .input('DepartmentID', sql.Int, workerData.DepartmentID)
            .query(sqlQueries.updateWorker)
        return update.recordset;
    } catch (err) {
        return err.message;
    }
}

const deleteWorker = async (WorkerID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('workers');
        const deleted = await pool.request()
            .input('WorkerID', sql.Int, WorkerID)
            .query(sqlQueries.deleteWorker);
        return deleted.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getWorkers,
    getWorkerById,
    createWorker,
    updateWorker,
    deleteWorker
}