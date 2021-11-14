import React, { useState,useContext } from 'react'
import { useHistory } from 'react-router-dom'
import noteContext from '../context/noteContext'

const SignUp = () => {
    const context = useContext(noteContext)
    const {showAlert} = context;
    const history = useHistory()
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const handleClick = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success === true) {
            //Redirect
            localStorage.setItem("token", json.authToken)
            history.push("/")
            showAlert("Registered","success")
        }
        else {
            showAlert("Invalid Credintials","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={handleClick}>
            <div className="mb-3">

                <label htmlFor="name" className="form-label">Name</label>
                <input type="name" className="form-control" id="name" aria-describedby="emailHelp" name="name" value={credentials.name} onChange={onChange} required />
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} required /> 
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default SignUp
