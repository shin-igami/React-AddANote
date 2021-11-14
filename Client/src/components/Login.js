import React, { useState,useContext } from 'react'
import { useHistory } from 'react-router-dom'
import noteContext from '../context/noteContext'

const Login = () => {
    const context = useContext(noteContext)
    const {showAlert} = context
    const history = useHistory()
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const handleClick = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success === true) {
            //Redirect
            localStorage.setItem("token", json.authToken)
            history.push("/")
            showAlert("Logged In","success")
        }
        else {
            showAlert("Invalid Credintials","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container my-3">
            <h2>Log In</h2>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" className="form-control" id="password" name="password" value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
