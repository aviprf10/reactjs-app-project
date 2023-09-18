import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({name}) {
    //1. State/Variable
    //2. Function
    //3. Return Statment return JSX(Javascript and XML)
    const nav = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem("user_details");
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("loggedInUser");
        nav("/login");
    }
    const auth = localStorage.getItem("loggedInUser");
    if(auth){
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-primary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about-us">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/friend-list">Friend</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/user-list">User</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact-us">Contact</Link>
                                </li>
                            </ul>
                            <div className="nav-item dropdown" style={{float:'right'}}>
                                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Welcome::
                                </Link>
                                <ul className="dropdown-menu" style={{marginLeft:'-6rem'}}>
                                    <li><Link className="dropdown-item" to="#">Edit Profile</Link></li>
                                    <li><Link className="dropdown-item" to="#">Setting</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link className="dropdown-item" onClick={ handleLogout }>Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav> 
            </>
          )
    }
  
}
