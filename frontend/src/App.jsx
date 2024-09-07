import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  // const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId , setEditId] = useState(-1);

  async function findTodos() {
    const response = await axios.get('http://localhost:8100/todos/find');
    setTodos(response.data);
  }
  async function addTodo() {
    try {
      await axios.post('http://localhost:8100/todos/create', { text });
      setText("");  // Clear the input field
      console.log("Todo added successfully");
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async function updateTodo(){
    await axios.put(`http://localhost:8100/todos/update/${editId}`, { text });
    setText("");
    setEditId(-1);
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
        backgroundColor: "red",

      }} onClick={findTodos}>All Todo</button>
      <br />

      {
        todos.map((todo, index) =>
          <div style={{
            border: "2px solid black",
            borderRadius: "10px",
            padding: "5px",
            margin: "2px",
            width: "30%"
          }} key={todo._id}>
            {todo._id === editId ?
              (<>
                <input type="text" value={text} onChange={(e) => {
                  setText(e.target.value);
                }}></input>
                <button onClick = {updateTodo}>update</button>
                <button onClick = {()=>{
                  setEditId(-1);
                }}>cancel</button>
              </>)
              :
              (<>
              {todo.todo}
              <button onClick={() => {
                setEditId(todo._id);
                setText(todo.todo);
                
                
              }}>edit todo</button>
            
              </>)
            }
            </div>
            
        )
      }


    </div>
  )
}

export default App;
