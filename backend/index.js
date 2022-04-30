'use strict';

const express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const departmentRoutes = require('./routes/departmentRoutes')
const workerRoutes = require('./routes/workerRoutes')
const typeExpense = require('./routes/typeExpenseRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', departmentRoutes.routes, workerRoutes.routes, typeExpense.routes)

app.listen(config.port, () => console.log('Server is listening on http://localhost' + config.port))