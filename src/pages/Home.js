import React from 'react'
import axios from "axios"; //allows you to do get/post requests from your own computer
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'

function Home() {

    const [listOfProjects, setListofProjects] = useState([]);
    let navigate = useNavigate();
    useEffect(()=>{
      axios.get("http://localhost:3001/projects").then((response)=>{
        setListofProjects(response.data)
      });
    }, [])

    return (
        <div>
            {listOfProjects.map((value, key)=>{
            return(
                <div className="project" 
                    onClick={()=>{
                        navigate(`/project/${value.id}`);
                    }}
                >
                <div className="nameOfP">
                    {value.name}
                </div>
                <div className="descriptionOfP">
                    {value.description}
                </div>
                <div className="footerOfP">
                    {value.username}
                </div>
                </div>
            );
            })}
        </div>
    );
}

export default Home