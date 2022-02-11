import React, {useState, useEffect, useContext} from 'react';
import {GlobalContext} from '../context/provider';
import SoftLoader from './SoftLoader';
import '../styles/LoginRegister.css';
import Web3 from "web3";
import supplyChain from '../contracts/supplyChain.json';

function Register() {
  // states
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [orgName, setOrgName] = useState("");
  const [acctType, setAcctType] = useState("");
  const [category, setCategory] = useState("none");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [solVerified, setSolVerified] = useState(false);
  const [acct, setAcct] = useState("");

  // context
  const {solid, soft} = useContext(GlobalContext);
  const [loading, setLoading] = solid;
  const [softLoading, setSoftLoading] = soft;

  // useEffect functions
  useEffect(async () => {
    if (window.ethereum) {
      try {
        let acc = await window.ethereum.send("eth_requestAccounts");
        let web3 = new Web3(window.ethereum);
        let acctF = await web3.eth.getAccounts();
        setAcct(acctF);
        setWeb3(web3);
        setLoading(false);
      } catch(err) 
      {
        console.log(err.message);
      }
    }
  }, []);

  useEffect(async () => {
    // solidity signup
    if (contract) {
      const res = await contract.methods.addManufacturerCheck().call({from: acct[0]});
      console.log(res);
      if (res) {
        setSolVerified(true);
        const a = await contract.methods.addManufacturer().send({from: acct[0]});
        setLoading(false);
        window.location.href = "/login";
      } else {
        alert("The wallet id is linked with another manufacturer account");
        setSoftLoading(false);
        return;
      }
    }
  }, [contract]);

  useEffect(async () => {
    if (solVerified) {
      // mongodb signup
      const response = await fetch("https://ezsupply-backend.herokuapp.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: pass,
          type: acctType,
          orgName: orgName,
          category: category
        }),
      })

      const data = await response.json();
      console.log(data);
      // setTimeout(() => {
      //     setLoading(false);
      //     window.location.href = "/login";
      // }, 300);
    }
  }, [solVerified]);

  // js functions

  const radioHandler = (e) => {
    setAcctType(e.target.value);
  }

  async function registerUser(e) {
    e.preventDefault();

    // validations
    if (acctType === "owner" && category === "none") {
      alert("Please choose your account category.");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email id provided.");
      return;
    } else {
      let count = (email.match(/@/g) || []).length;
      if (count > 1) {
        alert("Invalid email id provided.");
        return;
      }
      let broken = email.split("@");
      if (!(broken[1].includes("."))) {
        alert("Invalid email id provided.");
        return;
      }
      let dotBroken = broken[1].split(".");
      if (!dotBroken[1]) {
        alert("Invalid email id provided");
        return;
      }
    }
    if (pass.length < 7) {
      alert("Password length should be at least 8 characters.");
      return;
    }

    // contract integration
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = supplyChain.networks[networkId];
    const instance = new web3.eth.Contract(
      supplyChain.abi,
      deployedNetwork && deployedNetwork.address
    );
    setContract(instance);
    setSoftLoading(true);
  }

  const categoryUpdate = (e) => {
    setCategory(e.target.value);
  }

  if (!web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className='login-bg'>
      {softLoading 
      ? <SoftLoader />
      : ""
      }
      <div className='login-container register'>
        <h1>SIGN UP</h1>
        <form className='login-form' onSubmit={registerUser}>
            <div>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  required={true}
                />
                <label htmlFor="">Name</label>
            </div>
            <div>
                <input 
                  type="text" 
                  value={email} 
                  onChange={(e) => setemail(e.target.value)}
                  required={true}
                />
                <label htmlFor="">Email Id</label>
            </div>
            <div>
                <input 
                  type="password" 
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                  required={true}
                />
                <label htmlFor="">Password</label>
                {pass.length < 8 ?
                  <span id='pass-req-info'>Minimum 8 characters required</span>
                  : ""
                }
            </div>
            <div className='type-choose-radio'>
              <p>Account Type : </p>
              <div>
                <div>
                  <input type="radio" onChange={(e)=> radioHandler(e)} id='m' value="manufacturer" name="acc-type" required={true} />
                  <label htmlFor='m'>
                    Manufacturer
                  </label>
                </div>
                <div>
                  <input type="radio" onChange={(e) => radioHandler(e)} id='o' value="owner" name="acc-type" />
                  <label htmlFor='o'>
                    Owner
                  </label>
                </div>
              </div>
            </div>
            {
              acctType === "manufacturer" ?
              <div>
                  <input 
                    type="text" 
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required={true}
                  />
                  <label htmlFor="">Organisation Name</label>
              </div>
              : acctType === "owner" ?
              <select id='owner-type' value={category} onChange={(e) => categoryUpdate(e)} required={true}>
                <option value="none" disabled={true}>Choose category</option>
                <option value="Distributor">Distributor</option>
                <option value="Retailer">Retailer</option>
                <option value="Customer">Customer</option>
              </select>
              : ""
            }
            <input type="submit" value="Submit" />

        </form>
      </div>
    </div>
  );
}

export default Register;
