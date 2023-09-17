import React, { useState } from 'react'

export default function MyComponents() {
    const [salary, setSalary] = useState(10000)
    let getIncremnt = () => {
        setSalary(salary+10000);
    }
  return (
    <div>
        <button onClick={()=>{ getIncremnt(); }}>Incr</button>
      <h1>Hi My salary is {salary}</h1>
    </div>
  )
}
