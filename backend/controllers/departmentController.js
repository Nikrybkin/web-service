'use strict';

const departmentData = require('../data/departments');

const getDepartments = async (req, res, next) => {
    try {
        const departments = await departmentData.getDepartments();
        res.send(departments);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getDepartment =  async (req, res, next) => {
    try {
        const DepartmentID = req.params.id;
        const oneDepartment = await departmentData.getDepartmentById(DepartmentID);
        res.send(oneDepartment)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const addDepartment =  async (req, res, next) => {
    try {
        const data = req.body;
        const created = await departmentData.createDepartment(data)
        res.send(created)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const updateDepartment = async (req, res, next) => {
    try {
        const DepartmentID = req.params.id;
        const data = req.body;
        const updated = await departmentData.updateDepartment(DepartmentID, data)
        res.send(updated)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteDepartment = async (req, res, next) => {
    try {
        const DepartmentID = req.params.id;
        const deletedepartment = await departmentData.deleteDepartment(DepartmentID);
        res.send(deletedepartment)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    getDepartments,
    getDepartment,
    addDepartment,
    updateDepartment,
    deleteDepartment
}