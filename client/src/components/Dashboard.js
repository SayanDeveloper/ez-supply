import React, {useState, useEffect, useContext} from 'react';
import {GlobalContext} from "../context/provider";
import '../styles/main.css';
import TopNav from  './TopNav';
import SideNav from './SideNav';
import ProductDetails from './ProductDetails';
import Web3 from "web3";
import supplyChain from '../contracts/supplyChain.json';

function Dashboard() {
  // states
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [productId, setProductId] = useState("");

  // context
  const {solid, soft, modal, web3Ac, modalID} = useContext(GlobalContext);
  const [loading, setLoading] = solid;
  const [softLoading, setSoftLoading] = soft;
  const [modalOpen, setModalOpen] = modal;
  const [acct, setAcct] = web3Ac;
  const [modalId, setModalId] = modalID;

  // all useEffects
  useEffect(() => {
    async function metamaskConnection() {
      if (window.ethereum) {
        try {
          let acc = await window.ethereum.send("eth_requestAccounts");
          let web3 = new Web3(window.ethereum);
          setWeb3(web3);
          setLoading(false);
        } catch(err) 
        {
          console.log(err.message);
        }
      }
      setSoftLoading(false);
    };
    metamaskConnection();
  }, []);

  useEffect(() => {
    async function contractCalls() {
      if (contract) {
        contract.methods.verifyProduct(
          productId
        ).call({from: acct})
        .then(res => {
          console.log(res);
          if (res[1] === 0) {
            alert("Please enter valid product id");
          } else {
            setModalId(Object.values(res));
            setModalOpen(true);
          }
          setSoftLoading(false);
        })
        .catch(err => {
          console.log(err.message);
          setSoftLoading(false);
        });
      }
    };
    contractCalls();
  }, [contract])


  // functions
  const prodSearch = async () => {
    if (!productId) {
      alert("Please enter a product ID");
      return;
    }
    setSoftLoading(true);
    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = supplyChain.networks[networkId];
    const instance = new web3.eth.Contract(
      supplyChain.abi,
      deployedNetwork && deployedNetwork.address
    );
    setContract(instance);
  }
  
  if (sessionStorage.getItem('token') == null) {
    window.location.href = "/login";
    return;
  }
  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
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
          <div className='search-icon' onClick={prodSearch}>
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
