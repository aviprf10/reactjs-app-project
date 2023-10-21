import React, { useEffect, useState, useRef } from 'react'
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Editfriend() {
  var name="Friend Edit";
  var headname = "Friend";
  let params = useParams();
  const [userName, setuserName] = useState();
  const [userEmail, setuserEmail] = useState();

  const[friends, setFriend] = useState({
    
  });

  const renderAfterCalled = useRef(false);

  useEffect(() => {
    if (!renderAfterCalled.current) {
      getFriendData(params.id);
   }
   renderAfterCalled.current = true
  
  })
  
  let getFriendData = (friend_id)=>{
    try {
      axios
        .get(`${process.env.REACT_APP_LOCAL_URL}friends/${friend_id}`)
        .then(response=>{
          //console.log(response.data.data.attributes);
          setFriend(response.data.data.attributes);
        })
        .catch(e=>{
          Swal.fire({
            icon: 'error',
            title: e.response.data.e.name,
            text: e
          })
        })
    } catch (error) {
      console.log(error);
          Swal.fire({
            icon: 'error',
            title: error,
            text: error,
          })
    }
  }
  
  let updateUser = ()=>{
    var frinedId =  params.id;
    //console.log(abcd);
      try {
        var data ={
                "data": {
                "name":userName,
                "email":userEmail
            }
        };
      
        axios.put(`${process.env.REACT_APP_LOCAL_URL}friends/${frinedId}`,
            data,{
                headers: {
                    "Authorization": `Bearer  ${process.env.REACT_APP_TOKEN}`,
                    "accept": "application/json",
                    "Content-Type": "application/json",
                }}
            
        ).then(response =>{
            console.log("error", response)
            if(response.data !== null){
                Swal.fire(
                    'Good job!',
                    'Data saved successfully!',
                    'success'
                )
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.error.message,
                  })
            }
          
            //console.log(d)
        }).catch((error)=>{
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: error.response.data.error.name,
                text: error.response.data.error.message,
              })
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          })
    }
  }
  return (
    <>
      <div className="container"><br/>
          <h1>{name}</h1>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to='/friend-list'><button className='btn btn-info'> List {headname}</button></Link>
            <Link to='/friend-create'><button className='btn btn-primary'> Create {headname}</button></Link>
          </div> <br/>
          <form className="row g-3 needs-validation">
              <div className="col-md-4">
                  <label htmlFor="validationCustom01" className="form-label">Name</label>
                  <input type="text" className="form-control"  defaultValue={ friends.name } onChange = {(e) => { setuserName(e.target.value) }} placeholder="Enter Name" required/>
              </div>
              <div className="col-md-4">
                  <label htmlFor="validationCustomUsername" className="form-label">Email</label>
                  <input type="text" className="form-control" placeholder="Enter Email" defaultValue={ friends.email } onChange = {(e) => { setuserEmail(e.target.value) }} required/>
              </div>
              <div className="col-12">
                  <input className="btn btn-primary"  type="button" onClick={ updateUser } value="Submit form"/>
              </div>
          </form>
      </div>    
  </>
  )
}
