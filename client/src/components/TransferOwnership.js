import React, {useState, useEffect, useContext} from 'react';
import TopNav from './TopNav';
import SideNav from './SideNav';
import EachProduct from './EachProduct';
import ProductDetails from './ProductDetails';
import TransferModal from './TransferModal';
import { GlobalContext } from '../context/provider';
import Web3 from "web3";
import supplyChain from '../contracts/supplyChain.json';
// testing contract
import TestBlock from '../contracts/TestBlock.json';

function TransferOwnership() {
  // states
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [allIds, setAllIds] = useState([]);
  const [allProdNames, setAllProdNames] = useState([]);

  // context
  const {solid, soft, web3Ac, modal, transfer, UserData} = useContext(GlobalContext);
  const [userData, setUserData] = UserData;
  const [loading, setLoading] = solid;
  const [softLoading, setSoftLoading] = soft;
  const [acct, setAcct] = web3Ac;
  const [modalOpen, setModalOpen] = modal;
  const [transferMod, setTransferMod] = transfer;

  // functions
  useEffect(async () => {
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
    setSoftLoading(true);
  }, []);
  
  useEffect(async () => {
    if (web3) {
      setSoftLoading(true);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = supplyChain.networks[networkId];
      const instance = new web3.eth.Contract(
        supplyChain.abi,
        deployedNetwork && deployedNetwork.address
      );
      setContract(instance);
    }
  }, [web3]);

  useEffect(async () => {
    if (contract) {
      contract.methods.ownerProducts().call({from: acct})
      .then(res => {
        setAllProdNames(res);
      })
      .catch(err => {
        console.log(err.message);
      });

      contract.methods.ownerProductsId().call({from: acct})
      .then(res => {
        setAllIds(res);
      })
      .catch(err => {
        console.log(err.message);
      })
      setSoftLoading(false);
    }
  }, [contract]);


  if (sessionStorage.getItem('token') == null) {
    window.location.href = "/login";
    return;
  }
  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <>
      <TopNav />
      <SideNav />
      {modalOpen ?
        <ProductDetails id="100001" />
        : ""
        }
        {transferMod ?
        <TransferModal con={contract} id="100001" />
        : ""
      }
      <div className='main-content-container owned'>
        <h2>Owned Products</h2>
        {/* <div className='owned-search'>
          Search Product(by name):
        </div> */}
        <div className='owned-products-list'>
          {allIds.map((item, index) => {
            return(
              <EachProduct key={index} con={contract} prodId={item} prodName={allProdNames[index]} />
            )
          })}
        </div>
      </div>
    </>
    );
}

export default TransferOwnership;
