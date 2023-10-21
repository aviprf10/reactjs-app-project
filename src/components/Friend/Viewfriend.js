import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Viewfriend() {
  var name="Friend View";
  var headname = "Friend";
  let params = useParams();
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
  return (
    <>
    <div className="container" ><br/>
      <h1>{name}</h1>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to='/friend-list'><button className='btn btn-info'> List {headname}</button></Link>
        <Link to='/friend-create'><button className='btn btn-primary'> Create {headname}</button></Link>
      </div> <br/>
      <div>
        <div className="mb-3">
          <label className="form-label"><b>Name</b></label>
          <p>{friends.name}</p>
       </div>
        <div className="mb-3">
          <label className="form-label"><b>Email</b></label>
          <p>{friends.email}</p>
        </div>
      </div>
    </div>
    </>
  )
}
