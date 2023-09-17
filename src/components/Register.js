import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
    var headname="Register Form";
    const [userName, setuserName] = useState(''); 
    const [userEmail, setuserEmail] = useState(''); 
    const [userPassword, setuserPassword] = useState(''); 

    useEffect(()=>{

    }, []);

    let registerUser = () =>{
        var data = {
            "username":userName,
            "email":userEmail,
            "password":userPassword
        };

        axios
        .post(`${process.env.REACT_APP_LOCAL_URL}auth/local/register`, data)
        .then(response => {
            // Handle success.
            localStorage.setItem("user_id", response.data.user.id);
            localStorage.setItem("user_name", response.data.user.username);
            localStorage.setItem("user_email", response.data.user.email);
            localStorage.setItem("user_createat", response.data.user.createdAt);
            localStorage.setItem("jwt_token", response.data.jwt);

            Swal.fire(
                'Good job!',
                'User register successfully!',
                'success'
            )
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
            <h1>Create {headname}</h1>
            <br/>
            <form className="row g-3 needs-validation">
                <div className="row">
                    <div className="col-md-4" style={{margin:'auto'}}>
                        <label htmlFor="validationCustom01" className="form-label">Name</label>
                        <input type="text" className="form-control" defaultValue={ userName } onChange = {(e) => { setuserName(e.target.value) }} placeholder="Enter Name" required/>
                    </div>
                </div>
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
                        <input className="btn btn-primary"  type="button" onClick={ registerUser } value="Register"/>
                        <p  style={{float:'right'}}>Already have an account? <Link to="/">Login</Link></p>
                    </div>
                </div>    
            </form>
        </div>    
    </>
  )
}
