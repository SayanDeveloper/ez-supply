import React, { useEffect, useState, useContext } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
// context
import { GlobalContext } from "./context/provider";
// components
import SolidLoader from "./components/SolidLoader";
import SoftLoader from "./components/SoftLoader";
import Dashboard from "./components/Dashboard";
import TransferOwnership from './components/TransferOwnership';
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  // states
  const [storageValue, setStorageValue] = useState(0);
  const [accounts, setAccounts] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  // context fetch
  const {solid, soft, desig, toast} = useContext(GlobalContext);
  const [loading, setLoading] = solid;
  const [softLoading, setSoftLoading] = soft;
  const [designation, setDesignation] = desig;
  const [toastAppear, setToastAppear] = toast;

  useEffect(async () => {
    if (localStorage.getItem("token")) {
      const req = await fetch("http://localhost:7000/api/info", {
        headers: {
          'x-access-token': localStorage.getItem("token"),
        }
      })
      const data = await req.json();
      setDesignation(data.user.type);
    }
  //   try {
  //       // Get network provider and web3 instance.
  //       const web3In = await getWeb3();
  
  //       // Use web3 to get the user's accounts.
  //       const Accounts = await web3In.eth.getAccounts();
  
  //       // Get the contract instance.
  //       const networkId = await web3In.eth.net.getId();
  //       const deployedNetwork = SimpleStorageContract.networks[networkId];
  //       const instance = new web3In.eth.Contract(
  //         SimpleStorageContract.abi,
  //         deployedNetwork && deployedNetwork.address,
  //       );

  //       setWeb3(web3In);
  //       setAccounts(Accounts);
  //       setContract(instance);
  //       console.log(instance);
        
  //     } catch (error) {
  //       // Catch any errors for any of the above operations.
  //       alert(
  //         `Failed to load web3, accounts, or contract. Check console for details.`,
  //       );
  //       console.error(error);
  //     }
  }, []);

  // useEffect(async () => {

  //   console.log("test", contract);
  //   if (contract) {
  //     await contract.methods.set(5).send({ from: accounts[0] });
  //     const response = await contract.methods.get().call();
  //     setStorageValue(response);
  //   }

  // }, [contract])
  
    useEffect(() => {
      if (toastAppear) {
        setTimeout(() => {
          setToastAppear(false);
        }, 2000);
      }
    }, [toastAppear]);

    // if (!web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    return (
      <>
        <Router>
          {loading ? 
            <SolidLoader />
            : softLoading ?
            <SoftLoader />
            : ""
          }
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ChangeOwnership" element={<TransferOwnership />} />
            <Route path="/AddProduct" element={<AddProduct />} />
          </Routes>
        </Router>
      </>
    );
}

export default App;
