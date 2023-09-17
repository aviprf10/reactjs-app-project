import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Login() {
    const [userEmail, setuserEmail] = useState(''); 
    const [userPassword, setuserPassword] = useState(''); 
    let signInUser = () => {
        var data = {
                "identifier":userEmail,
                "password":userPassword
            
        };

        axios.post(`${process.env.REACT_APP_LOCAL_URL}auth/local`, data)
        .then(response => {
            localStorage.setItem("user_id", response.data.user.id);
            localStorage.setItem("user_name", response.data.user.username);
            localStorage.setItem("user_email", response.data.user.email);
            localStorage.setItem("user_createat", response.data.user.createdAt);
            localStorage.setItem("jwt_token", response.data.jwt);
            localStorage.setItem("loggedInUser",1);
            Navigate('/');
          })
          .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
            Swal.fire({
                icon: 'error',
                title: error.response.data.error.name,
                text: error.response.data.error.details.errors[0].message,
              })
          });
    }
  return (
    <>
       <div className="container"><br/>
            <h1>Login</h1>
            <br/>
            <form className="row g-3 needs-validation">
                <div className="row">
                    <div className="col-md-4" style={{margin:'auto'}}>
                        <label htmlFor="validationCustomUsername" className="form-label">Email</label>
                        <input type="text" className="form-control" defaultValue={ userEmail } onChange = {(e) => { setuserEmail(e.target.value) }} placeholder="Enter Email"  required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" style={{margin:'auto'}}>
                        <label htmlFor="validationCustomUsername" className="form-label">Password</label>
                        <input type="password" className="form-control" defaultValue={ userPassword } onChange = {(e) => { setuserPassword(e.target.value) }} placeholder="Enter Password"  required/>
                    </div>
                </div><br/><br/><br/><br/><br/>
                <div className="row">
                    <div className="col-md-4" style={{margin:'auto'}}>
                        <input className="btn btn-primary"  type="button" onClick={ signInUser } value="Sign In"/>
                        <p  style={{float:'right'}}>Don't have an account yet? <Link to="/register">Sign Up</Link></p>
                    </div>
                </div>    
            </form>
        </div>  
    </>
  )
}
