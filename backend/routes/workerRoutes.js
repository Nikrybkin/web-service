'use strict';

const express = require('express');
const workerController = require('../controllers/workerController');
const router = express.Router();

const {getWorkers, getWorker, addWorker, updateWorker, deleteWorker} = workerController;

router.get('/workers', getWorkers)
router.get('/workers/:id', getWorker)
router.post('/workers', addWorker)
router.put('/workers/:id', updateWorker)
router.delete('/workers/:id', deleteWorker)

module.exports = {
    routes: router
}