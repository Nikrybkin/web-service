'use strict';

const workerData = require('../data/workers');

const getWorkers = async (req, res, next) => {
    try {
        const workers = await workerData.getWorkers();
        res.send(workers);
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const getWorker =  async (req, res, next) => {
    try {
        const WorkerID = req.params.id;
        const oneWorker = await workerData.getWorkerById(WorkerID);
        res.send(oneWorker)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const addWorker =  async (req, res, next) => {
    try {
        const data = req.body;
        const created = await workerData.createWorker(data)
        res.send(created)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const updateWorker = async (req, res, next) => {
    try {
        const WorkerID = req.params.id;
        const data = req.body;
        const updated = await workerData.updateWorker(WorkerID, data)
        res.send(updated)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

const deleteWorker = async (req, res, next) => {
    try {
        const WorkerID = req.params.id;
        const deleteworker = await workerData.deleteWorker(WorkerID);
        res.send(deleteworker)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports = {
    getWorkers,
    getWorker,
    addWorker,
    updateWorker,
    deleteWorker
}