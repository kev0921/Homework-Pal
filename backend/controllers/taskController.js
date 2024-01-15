const { Request, Response } = require('express');
const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// Get all tasks
const getTasks = async (req, res) => {
    const user_id = req.user._id;

    const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(tasks);
};

// Get a single task
const getTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' });
    }

    const task = await Task.findById(id);

    if (!task) {
        return res.status(404).json({ error: 'No such task' });
    }

    res.status(200).json(task);
};

// Create a new task
const createTask = async (req, res) => {
    const { name, subject, description } = req.body;

    let emptyFields = [];

    if (!name) {
        emptyFields.push('name');
    }
    if (!subject) {
        emptyFields.push('subject');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in the required fields', emptyFields });
    }

    // Add a document to the database
    try {
        const user_id = req.user._id;
        const task = await Task.create({ name, subject, description, user_id });
        res.status(200).json(task);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' });
    }

    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
        return res.status(400).json({ error: 'No such task' });
    }

    res.status(200).json(task);
};

// Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' });
    }

    const task = await Task.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!task) {
        return res.status(400).json({ error: 'No such task' });
    }

    res.status(200).json(task);
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
};
