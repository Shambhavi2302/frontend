import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";
import { useUser } from './context/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useLocation } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { FaUser } from "react-icons/fa";


export default function Home() {

  const location = useLocation();

  const { isLoggedIn, logout } = useUser();

  const isAuthenticated = () =>{
    const token  = localStorage.getItem("token")
    return token!==null;
}

  const paths= ['/','/register'];
  if(paths.includes(location.pathname))
  {
    return null
  }


const handleLogout = () =>{
  logout();
  console.log("User logged out");
  // Check if token is removed
  console.log("Token after logout:", localStorage.getItem("token"));
}

console.log("isLoggedIn:", isLoggedIn);
console.log("isAuthenticated:", isAuthenticated());
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
    <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            {isAuthenticated  ? (<><NavLink className="nav-link" aria-current="page" to="/" onClick={handleLogout}><CiLogin />Logout</NavLink></>) : (<><NavLink className="nav-link" aria-current="page" to="/"><CiLogin />Login</NavLink></>)}
          </li>
        
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact"><FaPhoneAlt />Contact Us</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/addProduct">Add Product</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">Products</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/wishlist">My Wishlist</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/offers">Offers</NavLink>
          </li>

          {/* <li>
            <NavLink className="nav-link" to="/profile"><FaUserAlt /></NavLink>
          </li> */}
          </ul>
          <div class="d-flex" role="search">
          <NavLink className="nav-link" to="/profile"><FaUser style={{ color: 'white' }}/></NavLink>
          </div>
      </div>
    </div>
  </nav> <br /><br />

  </>
  )
}
