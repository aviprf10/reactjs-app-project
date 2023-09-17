import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Create() {
    var headname = "Friend";
    const [userName, setuserName] = useState();
    const [userEmail, setuserEmail] = useState();

    useEffect(()=>{

    }, []);

    let createUser = ()=>{
        // console.log(userName);
        // console.log(userEmail);
        var data = {
            "data":{
                "name":userName,
                "email":userEmail
            }
        };
        fetch('friends',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((d)=>{ return d.json(); }).then(d =>{ 
            if(d.data !== null){
                Swal.fire(
                    'Good job!',
                    'Data saved successfully!',
                    'success'
                )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: d.error.message,
                  })
            }
          
            //console.log(d)
        }).catch((e)=>{
            //console.log("E " + e);
        }).finally((all)=>{
            //console.log("All " + all);
        });
    }
  return (
    <>
        <div className="container"><br/>
            <h1>Create Friends without Auth</h1>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <Link to='/friend-list'><button className='btn btn-info'> List {headname}</button></Link>
                <Link to='/friend-create'><button className='btn btn-primary'> Create {headname}</button></Link>
            </div><br/>
            <form className="row g-3 needs-validation">
                <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">Name</label>
                    <input type="text" className="form-control" defaultValue={ userName } onChange = {(e) => { setuserName(e.target.value) }} placeholder="Enter Name" required/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustomUsername" className="form-label">Email</label>
                    <input type="text" className="form-control" placeholder="Enter Email" defaultValue={ userEmail } onChange = {(e) => { setuserEmail(e.target.value) }} required/>
                </div>
                <div className="col-12">
                    <input className="btn btn-primary"  type="button" onClick={ createUser } value="Submit form"/>
                </div>
            </form>
        </div>    
    </>
  )
}
