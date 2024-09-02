import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    // const [globalState,setGlobalState] = useState({token:"",id:""})
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
        });
        const json = await response.json()
        console.log(json)
        // console.log(json.success)
        // setGlobalState({...globalState,token:json.token,userId: json.user.id})
        // console.log(localStorage.getItem('token'))
        if(json.success){
            localStorage.setItem('token',json.token)
            props.showAlert("logged in successfully","success")
            navigate("/")
        }
        else{
            props.showAlert("check your email and password","danger")
        }
    }
    const onChange=(e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                    <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} autoComplete="on" onChange={onChange}/>
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Login
