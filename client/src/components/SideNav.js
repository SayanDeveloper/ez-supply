import React from 'react';
import { NavLink } from 'react-router-dom';

function SideNav() {
  
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className='sidenav'>
      <NavLink to="/" className='each-el'>
        Check Product details
      </NavLink>
      <NavLink to="/ChangeOwnership" className='each-el'>
        Change Ownership
      </NavLink>
      <div className='each-el' onClick={logout}>
        <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
      </div>
    </div>
    );
}

export default SideNav;
