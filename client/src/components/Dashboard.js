import React, {useState, useEffect, useContext} from 'react';
import {GlobalContext} from "../context/provider";
import '../styles/main.css';
import TopNav from  './TopNav';
import SideNav from './SideNav';
import ProductDetails from './ProductDetails';

function Dashboard() {
  // context
  const {solid, soft, modal} = useContext(GlobalContext);
  const [loading, setLoading] = solid;
  const [softLoading, setSoftLoading] = soft;
  const [modalOpen, setModalOpen] = modal;
  const [productId, setProductId] = useState("");

  useEffect(() => {
    setLoading(false);
    setSoftLoading(false);
  }, []);
  
  if (localStorage.getItem('token') == null) {
    window.location.href = "/login";
    return;
  }
  return (
    <>
      {modalOpen ?
          <ProductDetails />
          : ""
      }
      <TopNav />
      <SideNav />
      <div className='main-content-container dashboard'>
        <h2>Verify a product</h2>
        <div className='dashboard-search-container'>
          <input
            type="text"
            value={productId}
            placeholder="Enter the product ID"
            onChange={(e) => setProductId(e.target.value)}
          />
          <div className='search-icon' onClick={() => setModalOpen(true)}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </div>
        </div>
        <span>Or</span>
        <div className='scan-qr'>
        <i className="fa fa-qrcode" aria-hidden="true"></i> Scan QR code
        </div>
      </div>
    </>
  );
}

export default Dashboard;
