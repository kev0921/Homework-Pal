"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express = require("express");
var mongoose_1 = require("mongoose");
var contectRoutes = require('./routes/contacts');
// express app
var app = express();
//middleware
app.use(express.json());
app.use(function (req, res, next) {
    console.log(req.path, req.method);
    next();
});
// routes
app.use('/api/contacts', contectRoutes);
// Ensure that MONGO_URI environment variable is defined
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI environment variable is not defined.');
    process.exit(1); // Exit the process
}
// connect to db
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(function () {
    // listen for requests
    app.listen(process.env.PORT, function () {
        console.log('connected to db and listening on port', process.env.PORT);
    });
})
    .catch(function (error) {
    console.log(error);
});
