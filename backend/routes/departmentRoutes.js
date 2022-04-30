'use strict';

const express = require('express');
const departmentController = require('../controllers/departmentController')
const router = express.Router();

const {getDepartments, getDepartment, addDepartment, updateDepartment, deleteDepartment} = departmentController;

router.get('/departments', getDepartments)
router.get('/departments/:id', getDepartment)
router.post('/departments', addDepartment)
router.put('/departments/:id', updateDepartment)
router.delete('/departments/:id', deleteDepartment)


module.exports = {
    routes: router
}