import React from 'react'
import {Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import axios from "axios";

function Registration() {
    const initialValues = {
        name: "",
        username: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name of Project Required!"),
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required()
    });

    const onSubmit = (data)=>{
        axios.post("http://localhost:3001/auth", data).then(()=>{
            console.log(data);
        })
    };

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                <label>Name:</label>
                    <ErrorMessage name="name" component="span"/>
                    <Field autocomplete="off" id="inputCreateProject" name="name" placeholder="Your Name"/>

                    <label>Username:</label>
                    <ErrorMessage name="username" component="span"/>
                    <Field autocomplete="off" id="inputCreateProject" name="username" placeholder="Your Username"/>

                    <label>Password:</label>
                    <ErrorMessage name="password" component="span"/>
                    <Field autocomplete="off" type="password" id="inputCreateProject" name="password" placeholder="Your Password"/>

                    <button type="submit">Register</button>
                </Form>
        </Formik>
        </div>
    );
}

export default Registration
