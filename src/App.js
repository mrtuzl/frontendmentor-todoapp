import React, { useState } from 'react';
import './App.css';
import { FaTrash } from "react-icons/fa";
import light from './images/icon-sun.svg';
import dark from './images/icon-moon.svg';

function App() {

const [items, setItems] = useState('');
const [todo, setTodo] = useState([]);
const [show, setShow] = useState("all");
const [mode, setMode] = useState("dark");


const handleValue = (e) => {
  setItems(e.target.value);
}

const addTodo = (e) => {
  e.preventDefault();
  setShow("all");
    if ( 35 > items.length && items.length > 0)  {
      const item = {
        id: Math.floor(Math.random() * 1000),
        value: items,
        isMarked: false,
        isEditable: false
      };
    
      setTodo([...todo, item]);
      setItems("")
    
    }
   
}

function deleteItem(id) {
const newArray = todo.filter((item) => item.id !== id)
setTodo(newArray)
}

function deleteMarkedItem(id) {
setTodo(todo => todo.filter(todoitem => todoitem.isMarked === false ? {...todo} : null))

}

function markItem(id) {
setTodo(todo => todo.map(todoitem => todoitem.id === id ? {...todoitem, isMarked: !todoitem.isMarked} : todoitem))
}

function toggleMode(){
setMode((current => mode === "dark" ? "light" : "dark"));
 
}
  const allArray = todo.filter((item) => item.value).map((item) => {
    return <> 
    <li key={item.id} className={`li ${mode === "dark" ? "dark" : "light"}`} onClick={() => markItem(item.id)}  > 
    <p className={item.isMarked ? "marked" : ""}> {item.value} </p>
    <button className={`delete ${mode === "dark" ? "dark" : "light"}`}  onClick={() => deleteItem(item.id)}> <FaTrash/> </button> 
    </li>
    </>
  })

  const markedArray = todo.filter((item) => item.isMarked === true).map((item) => {
    return <> 
    <li key={item.id} className={`li ${mode === "dark" ? "dark" : "light"}`} onClick={() => markItem(item.id)}  > 
    <p className={item.isMarked ? "marked" : ""}> {item.value} </p>
    <button className={`delete ${mode === "dark" ? "dark" : "light"}`}  onClick={() => deleteItem(item.id)}> <FaTrash/> </button>
    </li>
    </>
  })

  const activeArray = todo.filter((item) => item.isMarked === false).map((item) => {
    return <> 
    <li key={item.id} className={`li ${mode === "dark" ? "dark" : "light"}`} onClick={() => markItem(item.id)} > 
    <p className={item.isMarked ? "marked" : ""}> {item.value} </p>
    <button className={`delete ${mode === "dark" ? "dark" : "light"}`} onClick={() => deleteItem(item.id)}> <FaTrash/> </button> 
    </li>
    </> 
  })
  return (
    <div className={`container ${mode === "dark" ? "darkBg" : "lightBg"}`}>
        <div className='header'> 
        <h1> TODO </h1> <img onClick={toggleMode} src={mode === "dark" ? light : dark} alt=''/> </div> 
        <form className="form"> 
          <input className={`inpt ${mode === "dark" ? "dark" : "light"}`} onChange={handleValue} type="text" name="todo" placeholder="Create a new todo..." value={items}/>
          <button className={`btn ${mode === "dark" ? "dark" : "light"}`} onClick={addTodo}> Add </button>  
        </form>

        <div className='list'> 
       <ul> 
          { 
          show === "all" ? allArray : show === "marked" ? markedArray : show === "active" ? activeArray : null
          }
       </ul>
          {
            todo.length > 0 ? 
        <div className={`info ${mode === "dark" ? "dark" : "light"}`}>  
        <span className={`span ${mode === "dark" ? "dark" : "light"}`}> 
        { 
          show === "all" ? activeArray.length + " " : show === "marked" ? markedArray.length + " " : show === "active" ? activeArray.length + " " : null
        }
           items left
        </span>
        <div className='buttons'> 
          <button className={`btn ${mode === "dark" ? "darkBtn" : "lightBtn"}`} onClick={() => setShow("all")}> All </button>
          <button className={`btn ${mode === "dark" ? "darkBtn" : "lightBtn"}`} onClick={() => setShow("active")} > Active </button> 
          <button className={`btn ${mode === "dark" ? "darkBtn" : "lightBtn"}`} onClick={() => setShow("marked")}> Completed </button> 
        </div>
        <button className={`btn ${mode === "dark" ? "darkBtn" : "lightBtn"}`} onClick={deleteMarkedItem}> Clear Completed </button> 
        </div>
            : null
          }
        {
          todo.length > 0 ? 
          <div className={`mobileButtons ${mode === "dark" ? "dark" : "light"}`}> 
            <button className={`btn ${mode === "dark" ? "darkBtn" : "lightBtn"}`} onClick={() => setShow("all")}> All </button>
           <button className={`btn ${mode === "dark" ? "darkBtn" : "lightBtn"}`} onClick={() => setShow("active")} > Active </button> 
            <button className={`btn ${mode === "dark" ? "darkBtn" : "lightBtn"}`} onClick={() => setShow("marked")}> Completed </button> 
          </div>
          : null
        }
    
        </div>
    </div>
  );
}

export default App;



