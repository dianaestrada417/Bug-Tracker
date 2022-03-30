import React, {useState, useContext} from 'react'
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext';

function Login() {
  const [username, setUsername] = useState(""); //state that holds the values for the username we're writing on the input
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);

  let navigate = useNavigate();

  const login=()=>{
    const data={username: username, password: password}
    axios.post("http://localhost:3001/auth/login", data).then((response)=>{
      console.log(response.data);
      if(response.data.error){
        alert(response.data.error);
      }
      else{
        localStorage.setItem("accessToken", response.data);
        setAuthState(true);
        navigate("/");
      }
    });
  };
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input type="text" onChange={(event)=>{
        setUsername(event.target.value); //setting our state to be equal to whatever exists inside of the input right now
      }}/>
      <label>Password:</label>
      <input type="password" onChange={(event)=>{
        setPassword(event.target.value); //setting our state to be equal to whatever exists inside of the input right now
      }}/>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
