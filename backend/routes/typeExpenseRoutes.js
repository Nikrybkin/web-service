'use strict';

const express = require('express');
const typeExpenseController = require('../controllers/typeExpenseController');
const router = express.Router();

const {getTypesExpense, getTypeExpense, addTypeExpense, updateTypeExpense, deleteTypeExpense} = typeExpenseController;

router.get('/typesExpense', getTypesExpense)
router.get('/typesExpense/:id', getTypeExpense)
router.post('/typesExpense', addTypeExpense)
router.put('/typesExpense/:id', updateTypeExpense)
router.delete('/typesExpense/:id', deleteTypeExpense)


module.exports = {
    routes: router
}