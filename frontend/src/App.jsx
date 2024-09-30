import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import './index.css';

function App() {
  // const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId , setEditId] = useState(-1);
  const [editText,setEditText] = useState("");

  async function findTodos() {
    const response = await axios.get('http://192.168.0.105:8100/todos/find');
    setTodos(response.data);
  }
  useEffect(()=>{
    findTodos();
  },[todos]);

  async function addTodo() {
    try {
      await axios.post('http://192.168.0.105:8100/todos/create', { text });
      setText("");  // Clear the input field
      console.log("Todo added successfully");
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async function updateTodo(){
    await axios.put(`http://192.168.0.105:8100/todos/update/${editId}`, { text });
    setText("");
    setEditId(-1);
  }
  function deleteTodo(){
    let a = 2;
  }


  return (
<div className='outer-container'>
  
    <div className='inner-container'>
    <div class="header-class">TODO APPLICATION</div>

      <input id="todo-input" type="text" placeholder='Type your todo' value={text} onChange={(e) => {
        setText(e.target.value);
      }}></input>
      <br />

      <button id="add-todo" onClick={addTodo}>Add Todo</button>
      <br />

      {/* <button style={{
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "lightgreen",

      }} onClick={findTodos}>All Todo</button>
      <br /> */}

      {
        todos.map((todo, index) =>
          <div className='todo-container' key={todo._id}>
            {todo._id === editId ?
              (<>
                <input type="text" value={text} onChange={(e) => {
                  setText(e.target.value);
                }}></input>
                <button id='one' onClick = {updateTodo}>update</button>
                <button id='delete-button' onClick={deleteTodo}>delete</button>
                <button id='two' onClick = {()=>{
                  setEditId(-1);
                }}>cancel</button>
              </>)
              :
              (<>
              <div className='inner-todo'>{todo.todo}</div>
              
              <div className = 'button-class'>
              <button onClick={() => {
                setEditId(todo._id);
                setText(todo.todo);
                
                
              }}>edit</button>
            </div>
              </>)
            }
            </div>
            
        )
      }


    </div>
    </div>
  )
}

export default App;
