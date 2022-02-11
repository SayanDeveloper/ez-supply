import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/provider';

function SideNav() {

  const {desig} = useContext(GlobalContext);
  // eslint-disable-next-line
  const [designation, setDesignation] = desig;
  
  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className='sidenav'>
      <NavLink to="/" className='each-el'>
        Check Product details
      </NavLink>
      {designation==="manufacturer" ?
        <NavLink to="/AddProduct" className='each-el'>
          Add Product
        </NavLink>
        : ""
      }
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
