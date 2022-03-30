import React, {useState, useEffect} from "react";
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom"
import Home from './pages/Home'
import CreateProject from "./pages/CreateProject";
import Project from "./pages/Project";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import {AuthContext} from './helpers/AuthContext'
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({username: "", id:0, status: false});

  useEffect(()=>{
    axios.get('http://localhost:3001/auth/auth', {headers:{
      accessToken: localStorage.getItem('accessToken'),
    }}).then((response)=>{
      if(response.data.error){
        setAuthState({...authState, status: false});
      }
      else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  const logout=()=>{
    localStorage.removeItem("accessToken");
    setAuthState({username: "", id:0, status: false}); //not logged in
  }

  return (
    <div className="tracker-app">
      <AuthContext.Provider value={{authState, setAuthState}}>
        <Router>
          <div className="navbar">
            <Link to ="/">HomePage</Link>          
            <Link to ="/createproject">Create a Project</Link>
            {!authState.status ? (
              <>
                <Link to ="/login">Login</Link>
                <Link to ="/registration">Register</Link>            
              </>
            ):(
              <button onClick={logout}>Logout</button>
            )}
            <h1>{authState.username}</h1>
          </div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/createproject" element={<CreateProject/>}/>
            <Route path="/project/:id" element={<Project/>}/>
            <Route path="/login" element={<Login/>}/> 
            <Route path="/registration" element={<Registration/>}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;


//20:16 episode 10