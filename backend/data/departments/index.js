'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getDepartments = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('departments');
        const list = await pool.request().query(sqlQueries.departmentslist);
        return list.recordset;
    } catch (err) {
        return err.message;
    }
}

const getDepartmentById = async (DepartmentID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('departments');
        const oneDepartment = await pool.request().input('DepartmentID', sql.Int, DepartmentID).query(sqlQueries.departmentById)
        return oneDepartment.recordset;
    } catch (err) {
        return err.message
    }
}

const createDepartment = async (departmentData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('departments');
        const insertDepartment = await pool.request()
            .input('Name', sql.NVarChar(40), departmentData.Name)
            .input('NumberWorkers', sql.Int, departmentData.NumberWorkers)
            .query(sqlQueries.createDepartment)
        return insertDepartment.recordset;
    } catch (err) {
        return err.message;
    }
}

const updateDepartment = async (DepartmentID, departmentData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('departments');
        const update = await pool.request()
            .input('DepartmentID', sql.Int, DepartmentID)
            .input('Name', sql.NVarChar(40), departmentData.Name)
            .input('NumberWorkers', sql.Int, departmentData.NumberWorkers)
            .query(sqlQueries.updateDepartment)
            return update.recordset;
    } catch (err) {
        return err.message
    }
}

const deleteDepartment = async (DepartmentID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('departments');
        const deleted = await pool.request()
            .input('DepartmentID', sql.Int, DepartmentID)
            .query(sqlQueries.deleteDepartment);
        return deleted.recordset;
    } catch (err) {
        return err.message;
    }
}

module.exports = {
    getDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
}