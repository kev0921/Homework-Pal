import 'dotenv/config';

import { Request, Response } from 'express';
import * as express from 'express';
import mongoose from 'mongoose';
const contectRoutes = require('./routes/contacts')

// express app
const app = express.default()

//middleware
app.use(express.json())

app.use((req: Request, res: Response, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/contacts', contectRoutes)

// Ensure that MONGO_URI environment variable is defined
if (!process.env.MONGO_URI) {
    console.error('MONGO_URI environment variable is not defined.');
    process.exit(1); // Exit the process
}

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to db and listening on port', process.env.PORT) 
        })
    })
    .catch((error) => {
        console.log(error)
    })
