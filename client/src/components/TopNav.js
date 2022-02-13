import React, {useState, useEffect, useContext} from 'react';
import Web3 from "web3";
import '../styles/AllNav.css';
import { GlobalContext } from '../context/provider';

function TopNav() {
  // context
  const {web3Ac, sideNav} = useContext(GlobalContext);
  const [acct, setAcct] = web3Ac;
  const [sideNavOpen, setSideNavOpen] = sideNav;

  // useEffect functions
  useEffect(() => {
    async function metamaskConnection() {
      if (window.ethereum) {
        try {
          let acc = await window.ethereum.send("eth_requestAccounts");
          let web3 = new Web3(window.ethereum);
          if (!acct) {
            const accounts = await web3.eth.getAccounts();
            setAcct(accounts[0]);
          }
        } catch(err) 
        {
          console.log(err.message);
        }
      }
    }
    metamaskConnection();
  }, []);
  
  return (
    <div className='topnav-container'>
      <div className='hamburger-container' onClick={() => setSideNavOpen(!sideNavOpen)}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <h1 className='logo'>EZ Supply</h1>
      <div className='wallet-details text-center'>
        Wallet Address:<br />
        <span>
          {acct}
        </span>
      </div>
    </div>
  );
}

export default TopNav;
