import React from 'react';
import '../styles/AllNav.css';

function TopNav() {
  return (
    <div className='topnav-container'>
      <h1 className='logo'>EZ Chain</h1>
      <div className='wallet-details text-center'>
        Wallet Address:<br />
        0x23234ab78fe3453
      </div>
    </div>
  );
}

export default TopNav;
