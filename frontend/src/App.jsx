import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  // const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  async function findTodos() {
    const response = await axios.get('http://localhost:8100/todos/find');
    setTodos(response.data);
  }
  async function addTodo(){
    try {
      await axios.post('http://localhost:8100/todos/create', { text });
      setText("");  // Clear the input field
      console.log("Todo added successfully");  
    } catch (error) {
      console.error('Error adding todo:', error); 
  }


  return (
    <div style={{
      padding: "5%"
    }}>

      <input style={{

        height: "40px",
        width: "20%",
        border: "1px solid black",
        boxShadow: "10 10",
        borderRadius: "5px",
        backgroundColor: "lightgrey"


      }} type="text" placeholder='Type your todo' value={text} onChange={(e) => {
        setText(e.target.value);
      }}></input>
      <br />

      <button style={{
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "red"

      }} onClick={addTodo}>Add Todo</button>
      <br />

      <button style={{
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "red"

      }} onClick={findTodos}>All Todo</button>
      <br />

      {
        todos.map((todo, index) =>
          <li key={index}>{todo.todo}</li>
        )
      }


    </div>
  )
}

export default App
