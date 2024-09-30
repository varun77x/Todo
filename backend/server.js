require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); //cors

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const todoRouter = require('./routes/todoRoutes');
app.get("/",(req,res)=>{
    res.send("okok");
});

app.use("/todos",todoRouter);


app.listen(process.env.PORT,'0.0.0.0');