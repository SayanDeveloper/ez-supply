import React from 'react';
import TopNav from './TopNav';
import SideNav from './SideNav';
import EachProduct from './EachProduct';

function TransferOwnership() {
  if (localStorage.getItem('token') == null) {
    window.location.href = "/login";
    return;
  }
  return (
    <>
      <TopNav />
      <SideNav />
      <div className='main-content-container owned'>
        <h2>Owned Products</h2>
        {/* <div className='owned-search'>
          Search Product(by name):
        </div> */}
        <div className='owned-products-list'>
          <EachProduct />
        </div>
      </div>
    </>
    );
}

export default TransferOwnership;
