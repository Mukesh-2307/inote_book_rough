import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name,
            email: credentials.email,
            password: credentials.password})
        });
        const json = await response.json()
        console.log(json +'received as response')
        if(json.success){
          await window.localStorage.setItem('token',json.token)
          navigate("/login")
          props.showAlert("Signup successfully","success")
        }
        else{
          props.showAlert("invalid details","danger")
        }
    }
    const onChange=(e)=>{
        setcredentials({...credentials, [e.target.name]: e.target.value})
        // console.log(e.target.value)
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="form-group my-2">
          <label htmlFor="name">user name</label>
          <input type="text" className="form-control" id="name" name='name' placeholder="Enter username" value={credentials.name} onChange={onChange} />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} />
          <small id="email" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password' placeholder="Password" autoComplete="on" value={credentials.password} onChange={onChange} />
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' placeholder="confirm Password" autoComplete="on" value={credentials.cpassword} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  )
}

export default Signup
