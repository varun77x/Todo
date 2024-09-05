import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

function App() {
  const [todo, setTodo] = useState([]);
  const [text,setText] = useState("");
  function addTodo() {
    console.log(2);
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


      }} type="text" placeholder='Type your todo' value={todo} onChange={(e) => {
        setTodo(...todo,e.target.value);
      }}></input>

      <button style={{
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "red"

      }} onClick={addTodo}>Add Todo</button>


    </div>
  )
}

export default App
