const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Todo = require('../models/todoModel');

router.get('/find', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})
router.post('/create', async (req, res) => {
    let todo = req.body.text;
    const newTodo = new Todo({
        todo
    })
    await newTodo.save();
    res.status(201).send({ message: 'Todo created' });
    console.log("todo created");
})

module.exports = router;