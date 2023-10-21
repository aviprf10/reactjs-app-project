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

    let registerUser = (event) =>{
        event.preventDefault();
        var data = {
            "username":userName,
            "email":userEmail,
            "password":userPassword
        };

        axios
        .post(`${process.env.REACT_APP_LOCAL_URL}auth/local/register`, data)
        .then(response => {
            // Handle success.
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
            <form className="row g-3 needs-validation" data-parsley-validate onSubmit={ registerUser }>
                <div className="row">
                    <div className="col-md-4" style={{margin:'auto'}}>
                        <label htmlFor="validationCustom01" className="form-label">Name</label>
                        <input type="text" className="form-control" data-parsley-required="true" defaultValue={ userName } onChange = {(e) => { setuserName(e.target.value) }} placeholder="Enter Name" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" style={{margin:'auto'}}>
                        <label htmlFor="validationCustomUsername" className="form-label">Email</label>
                        <input type="text" className="form-control" data-parsley-required="true" defaultValue={ userEmail } onChange = {(e) => { setuserEmail(e.target.value) }} placeholder="Enter Email"  />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" style={{margin:'auto'}}>
                        <label htmlFor="validationCustomUsername" className="form-label">Password</label>
                        <input type="password" className="form-control" data-parsley-required="true" defaultValue={ userPassword } onChange = {(e) => { setuserPassword(e.target.value) }} placeholder="Enter Password"  />
                    </div>
                </div><br/><br/><br/><br/><br/>
                <div className="row">
                    <div className="col-md-4" style={{margin:'auto'}}>
                        <input className="btn btn-primary"  type="submit"  value="Register"/>
                        <p  style={{float:'right'}}>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>    
            </form>
        </div>    
    </>
  )
}
