import logo from './logo.svg';
import './App.css';
import React,{useState} from 'react';
import axios from 'axios';
const url = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

function App() {
  const [text, setText] = useState('text');
  const handleClick = async () =>{
    let result = await axios.get(`${url}/`);
    setText(result.data)
  }
  return (
    <div className="App">
      <button onClick={handleClick}>Get API</button>
      <div>{text}</div>
    </div>
  );
}

export default App;
