const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Todo = require('../models/todoModel');

router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
})

module.exports = router;