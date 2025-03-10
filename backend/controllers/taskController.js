const Task = require('../models/task.js');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createTask = async (req, res) => {
    const { title, description, assignedTo, deadline, priority } = req.body;

    try {
        const task = new Task({
            title,
            description,
            assignedTo,
            deadline,
            priority,
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTask = async (req, res) => {
    const { title, description, assignedTo, deadline, priority, status } = req.body;

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.assignedTo = assignedTo || task.assignedTo;
        task.deadline = deadline || task.deadline;
        task.priority = priority || task.priority;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.remove();
        res.json({ message: 'Task removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };