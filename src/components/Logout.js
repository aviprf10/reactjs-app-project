import React from 'react'
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const nav = useNavigate();
    localStorage.removeItem("user_details");
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("loggedInUser");
   
  return (
    nav("/login")
  )
}
