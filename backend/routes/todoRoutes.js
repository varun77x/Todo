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
router.put('/update/:editId', async (req, res) => {
    //no TRY CATCH , we go RAW
    const id = req.params.editId;
    console.log(id);
    const textToUpdate = req.body.text;

    const result = await Todo.updateOne(
        { _id: id },
        { $set: { todo: textToUpdate } }
    );
    if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    if (result.modifiedCount === 0) {
        return res.status(200).json({ message: 'Todo was not modified' });

    }
    res.status(200).json({ message: "done" });
})
router.delete('/delete/:todoId',async (req,res)=>{
    const deleteId = req.params.todoId;
    const deleteResult  = await Todo.deleteOne({_id:deleteId});
    if (deleteResult.deletedCount > 0) {
        res.json({ message: 'User deleted successfully' });
      }
})

module.exports = router;