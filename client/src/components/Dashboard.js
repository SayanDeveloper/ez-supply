import React, {useState, useEffect, useContext} from 'react';
import {GlobalContext} from "../context/provider";
import '../styles/main.css';
import TopNav from  './TopNav';
import SideNav from './SideNav';

function Dashboard() {
  // context
  const {solid, soft} = useContext(GlobalContext);
  const [loading, setLoading] = solid;
  const [softLoading, setSoftLoading] = soft;
  const [productId, setProductId] = useState("");

  useEffect(() => {
    setLoading(false);
    setSoftLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  
  if (localStorage.getItem('token') == null) {
    window.location.href = "/login";
    return;
  }
  return (
    <>
      <TopNav />
      <SideNav />
      <div className='main-content-container dashboard'>
        <h2>Track a product</h2>
        <div className='dashboard-search-container'>
          <input
            type="text"
            value={productId}
            placeholder="Enter the product ID"
            onChange={(e) => setProductId(e.target.value)}
          />
          <div className='search-icon'>
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
