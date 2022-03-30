import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import axios from "axios"; 
import {useNavigate} from "react-router-dom";

function CreateProject() {
  let navigate = useNavigate();
  const initialValues = {
    name: "",
    description: "",
    username: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name of Project Required!"),
    description: Yup.string().required(),
    username: Yup.string().min(3).max(15).required()
  })

  const onSubmit=(data)=>{
      axios.post("http://localhost:3001/projects", data).then((response)=>{
        navigate("/");
      });
  }

  return (
    <div className="createProjectPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
            <label>Name:</label>
            <ErrorMessage name="name" component="span"/>
            <Field id="inputCreateProject" name="name" placeholder="Name of Project"/>

            <label>Description:</label>
            <ErrorMessage name="description" component="span"/>
            <Field id="inputCreateProject" name="description" placeholder="Description of Project"/>

            <label>Username:</label>
            <ErrorMessage name="username" component="span"/>
            <Field id="inputCreateProject" name="username" placeholder="Your Username"/>

            <button type="submit">Create Project</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreateProject