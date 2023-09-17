
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import Navbar from './components/Common/Navbar';
import Home from './components/Home';
//import Footer from './components/Footer';
//import Hoc from './components/Hoc';
import Listfriend from './components/Friend/List';
import Createfriend from './components/Friend/Create';
import Listuser from './components/User/List';
import Createuser from './components/User/Create';
import Aboutus from './components/Aboutus';
import Contactus from './components/Contactus';
import Notfound from './components/Notfound';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';

 


export default function App() {
  //const[x, setX] = useState(10);
  const loggedInUser = localStorage.getItem('loggedInUser');
  console.log(loggedInUser);
  if(loggedInUser !==0 && loggedInUser !==null) {
    return (
          <Router>
              <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/friend-list" element={<Listfriend />} />
                <Route path="/friend-create" element={<Createfriend />} />
                <Route path="/user-list" element={<Listuser />} />
                <Route path="/user-create" element={<Createuser />} />
                <Route path="/contact-us" element={<Contactus />} />
                <Route path="/logout" element={<Logout />}></Route>
                <Route path="*" element={<Notfound />} />
              </Routes>
          </Router>
        );
      }else{
        return (
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
              
        ); 
      }
}
//App = Hoc(App);
//export default App;
