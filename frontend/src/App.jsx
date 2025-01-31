import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios, { all } from 'axios';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myImage from './assets/nothinghere.png';


function App() {
  // const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [editText, setEditText] = useState("");
  const updateInputRef = useRef();

  async function findTodos() {
    const response = await axios.get('http://localhost:8100/todos/find');
    setTodos(response.data);
  }
  useEffect(() => {
    findTodos();
  }, []);

  async function addTodo() {
    if (!text) {
      toast.info("Todo cannot be empty");
      return;
    }
    try {
      toast.info("Adding todo..");
      console.log("hi");
      await axios.post('http://localhost:8100/todos/create', { text });
      setText("");  // Clear the input field
      await findTodos();
      console.log("Todo added successfully");
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async function updateTodo() {
    await axios.put(`http://localhost:8100/todos/update/${editId}`, { editText });
    setEditText("");
    await findTodos();
    setEditId(-1);

  }
  async function deleteTodo(todoId) {

    await axios.delete(`http://localhost:8100/todos/delete/${todoId}`);
    await findTodos();
    setEditId(-1);
  }
  function handleAddKeyDown(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  }
  // var deleteButtonText = "delete";
  useEffect(() => {
    if (editId !== -1) {
      updateInputRef.current.focus();
    }
  }, [editId]);
  // function handleRef(){
  //   updateInputRef.current.focus();
  // }

  return (


    <div class="flex flex-col items-center h-screen w-screen max-w-full">
      <div class=" tracking-widest w-full h-16 min-h-16 flex justify-center items-center font-mono font-bold text-[20px] text-gray-200 bg-green-500 border-b-green-600">TODO APPLICATION</div>

      <input class="font-mono w-full h-14 min-h-14 text-lg bg-gray-100 p-2 outline-none border-b-2" type="text" placeholder='Type your todo' value={text} onChange={(e) => {
        let inputText = e.target.value;
        if (inputText.length > 25) {
          toast.info("character limit exceed");
        }
        else {
          setText(inputText);
        }
      }}
        onKeyDown={handleAddKeyDown}
      ></input>
      <br />

      <button class="font-mono p-2 border-b-2 border-t-2" onClick={addTodo}>Add Todo</button>
      <br />

      
      <div class="w-full">

        {
          todos.length?(<> {todos.map((todo, index) =>

            <div class=" flex flex-col flex-nowrap m-2 border-2 border-gray-500 rounded-lg shadow-md" key={todo._id}>
              {todo._id === editId ?
                (<div class=" bg-slate-200 rounded-lg p-2">
                  <input class="outline-none bg-transparent m-2 p-2 w-[80%] font-mono" ref={updateInputRef} type="text" value={editText} onChange={(e) => {
                    let editTextvalue = e.target.value;
                    if(editTextvalue.length > 25){
                      toast.info("character limit exceeded");
                    }
                    else {
                      setEditText(editTextvalue);
                    }
                  }} onKeyDown={(e)=>{
                    if(e.key === 'Enter'){
                      updateTodo();
                    }
                  }}></input>

                  <div>
                    <button class="m-2 p-2 border-b-2 border-gray-500 text-gray-500 hover:text-black hover:border-black" onClick={updateTodo}>update</button>

                    <button class="m-2 p-2 border-b-2 border-gray-500 text-gray-500 hover:text-black hover:border-black" onClick={() => {
                      setEditId(-1);
                    }}>cancel</button>
                  </div>
                </div>)
                :
                (<>
                  <div class=" m-2 p-2 w-[80%] font-mono box">{todo.todo}</div>

                  <div >
                    <button class="m-2 p-2 border-b-2 border-gray-500 text-gray-500 hover:text-black hover:border-black" onClick={() => {
                      toast.info("Deleting...");
                      console.log(todo._id);
                      deleteTodo(todo._id);
                    }
                    }>delete</button>
                    <button class="m-2 p-2 border-b-2 border-gray-500 text-gray-500 hover:text-black hover:border-black" onClick={() => {
                      setEditId(todo._id);
                      setEditText(todo.todo);


                    }}>edit</button>
                  </div>
                </>)
              }
            </div>

          )}</>)
            :
            (<div class="flex justify-center items-center">
              <img src={myImage} alt="Todo Image" className="w-1/3 h-1/3 object-cover" />
            </div>)
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
