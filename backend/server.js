require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
});

const Todo = mongoose.model('Todo', todoSchema);

async function random(){

    const newTodo = new Todo({
        todo:"do some gym"
    });
    await newTodo.save();
};
random();


app.get("/", async (req, res) => {
    const todosAll = await Todo.find();
    res.json(todosAll);
    
});

app.listen(process.env.PORT);