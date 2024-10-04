import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios, { all } from 'axios';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  },[]);

  async function addTodo() {
    if(!text){
      return;
    }
    try {
      await axios.post('http://192.168.0.105:8100/todos/create', { text });
      setText("");  // Clear the input field
      await findTodos();
      console.log("Todo added successfully");
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async function updateTodo(){
    await axios.put(`http://192.168.0.105:8100/todos/update/${editId}`, { editText });
    setEditText("");
    await findTodos();
    setEditId(-1);

  }
  async function deleteTodo(todoId){
    
    await axios.delete(`http://192.168.0.105:8100/todos/delete/${todoId}`);
    await findTodos();
    setEditId(-1);
  }
  function handleKeyDown(e){
    if (e.key === 'Enter') {
      addTodo(); 
    }
  }
  // var deleteButtonText = "delete";


  return (

  
    <div className='inner-container'>
    <div className="header-class">TODO APPLICATION</div>

      <input id="todo-input" type="text" placeholder='Type your todo' value={text} onChange={(e) => {
        let inputText = e.target.value;
        if(inputText.length > 25){
          toast.info("character limit exceed");
        }
        else{
          setText(inputText);
        }
      }}
      onKeyDown={handleKeyDown}
      ></input>
      <br />

      <button id="add-todo" onClick={addTodo}>Add Todo</button>
      <br />

      {/* <button style={{
        height: "40px",
        borderRadius: "5px",
        backgroundColor: "lightgreen",

      }} onClick={findTodos}>All Todo</button>
      <br /> */}
      <div className='section'>

      {
        todos.map((todo, index) =>
          
          <div className='todo-container' key={todo._id}>
            {todo._id === editId ?
              (<>
                <input type="text" value={editText} onChange={(e) => {
                  setEditText(e.target.value);
                }}></input>
                <button id='one' onClick = {updateTodo}>update</button>
                
                <button id='two' onClick = {()=>{
                  setEditId(-1);
                }}>cancel</button>
              </>)
              :
              (<>
              <div className='inner-todo'>{todo.todo}</div>
              
              <div className = 'button-class'>
              <button id='delete-button' onClick={()=>{
                toast.info("Deleting...");
                console.log(todo._id);
                deleteTodo(todo._id);
              }
              }>delete</button>
              <button onClick={() => {
                setEditId(todo._id);
                setEditText(todo.todo);
                
                
              }}>edit</button>
            </div>
              </>)
            }
            </div>
            
        )
        
      }
      <ToastContainer
      position='bottom-center'
      autoClose={500}
      hideProgressBar={true}
      newestOnTop={true}
      
      />
      </div>


    </div>
    
  )
}

export default App;
