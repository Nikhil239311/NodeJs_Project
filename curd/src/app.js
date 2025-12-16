const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/users', require('./routes/user.routes'));
app.use('/api/departments',  require('./routes/department.routes'));
module.exports = app;
