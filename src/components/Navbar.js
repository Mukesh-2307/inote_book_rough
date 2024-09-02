import React,{useEffect} from 'react'
import {Link,useLocation,useNavigate} from 'react-router-dom'

const Navbar = () => {
    let navigate = useNavigate();
    let location = useLocation();
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate("/login")
    }
    useEffect(() => {
    //   console.log(location.pathname)
    }, [location]);
  
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand mx-3" to="/" >iNoteBook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className={`nav-item nav-link ${location.pathname === "/"?"active":""}`} to="/">Home</Link>
                    <Link className={`nav-item nav-link ${location.pathname === "/about"?"active":""}`} to="/about">About</Link>
                    {/* <Link className="nav-item nav-link" to="/user">User</Link> */}
                </div>
            </div>
            {!localStorage.getItem('token')?<div className="btn">
            <Link className="btn btn-primary mx-1" to="/login" role="button">login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">signup</Link>
            </div>:<button className='btn btn-primary mx-3' onClick={handleLogout}>Logout</button>}
        </nav>
    )
}

export default Navbar
 