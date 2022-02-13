import React, { useContext, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../context/provider';

function SideNav() {

  // contexts
  const {desig, sideNav} = useContext(GlobalContext);
  // eslint-disable-next-line
  const [designation, setDesignation] = desig;
  const [sideNavOpen, setSideNavOpen] = sideNav;

  // useRefs
  const sideNavRef = useRef();

  // useEffects
  useEffect(() => {
    if (sideNavOpen) {
      sideNavRef.current.style.transform = "translateX(0px)";
    } else {
      sideNavRef.current.style.transform = "translateX(-300px)";
    }
  }, [sideNavOpen]);

  window.onresize = function() {
    if (window.innerWidth > 960) {
      setSideNavOpen(false);
    }
  }
  
  const logout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {sideNavOpen ?
        <div className='sidebar-dark-bg' onClick={() => setSideNavOpen(false)}></div>
      : ""}
      <div className='sidenav' ref={sideNavRef}>
        <NavLink to="/" onClick={() => setSideNavOpen(false)} className='each-el'>
          Check Product details
        </NavLink>
        {designation==="manufacturer" ?
          <NavLink to="/AddProduct" onClick={() => setSideNavOpen(false)} className='each-el'>
            Add Product
          </NavLink>
          : ""
        }
        <NavLink to="/ChangeOwnership" onClick={() => setSideNavOpen(false)} className='each-el'>
          Change Ownership
        </NavLink>
        <div className='each-el' onClick={logout}>
          <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
        </div>
      </div>
    </>
    );
}

export default SideNav;
