import React from 'react'
import { Link } from 'react-router-dom';

export default function List() {
  var name="User List With Auth";
  var headname = "User";
  return (
    <div className="container"><br/>
      <h1>{name}</h1>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <Link to='/user-list'><button className='btn btn-info'> List {headname}</button></Link>
        <Link to='/user-create'><button className='btn btn-primary'> Create {headname}</button></Link>
      </div> <br/>
      <ul className="list-group">
        <li className="list-group-item">An item</li>
        <li className="list-group-item">A second item</li>
        <li className="list-group-item">A third item</li>
        <li className="list-group-item">A fourth item</li>
        <li className="list-group-item">And a fifth one</li>
      </ul>
    </div>
  )
}
