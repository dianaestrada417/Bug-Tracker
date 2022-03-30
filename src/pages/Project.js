import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from "axios";

function Project() {
    let {id} = useParams();
    const [projectObject, setProjectObject] = useState({});
    const [bugs, setBugs] = useState([]);
    const [newBug, setNewBug] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:3001/projects/byId/${id}`).then((response)=>{
            setProjectObject(response.data);
        });

        axios.get(`http://localhost:3001/bugs/${id}`).then((response)=>{
            setBugs(response.data);
        });
    }, []);

    const addBug = ()=>{
        axios.post("http://localhost:3001/bugs", {bugBody: newBug, ProjectId: id},
        {
            headers:{
                accessToken: localStorage.getItem("accessToken"),
            },
        }
        ).then((response)=>{
            if(response.data.error){
                console.log(response.data.error);
            }
            else{
                const bugToAdd = {bugBody: newBug, username: response.data.username}
                setBugs([...bugs, bugToAdd]);
                setNewBug("")
            }
        });

    }

    return (
        projectObject && (
            <div className="projectPage">
                <div className="leftSide">
                    <div className="project" id="individual">
                        <div className="nameOfP">
                            {projectObject.name}
                        </div>
                        <div className="descriptionOfP">
                            {projectObject.description}
                        </div>
                        <div className="footerOfP">
                            {projectObject.username}
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="addBugContainer">
                        <input type="text" 
                        placeholder="Bug..." 
                        onChange={(event)=>{setNewBug(event.target.value)}}
                        value={newBug}
                        />
                        <button onClick={addBug}>Add Bug</button>
                    </div>
                    <div className="listOfBugs">
                        {bugs.map((bug, key)=>{
                            return(
                                <div key={key} className="bug">
                                    {bug.bugBody}
                                    <label>Username: {bug.username}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
  );
}

export default Project
