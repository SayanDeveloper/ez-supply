import React, { useEffect, useState, useContext } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
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

  // context fetch
  const {solid, soft, desig, toast, UserData} = useContext(GlobalContext);
  const [userData, setUserData] = UserData;
  const [loading, setLoading] = solid;
  const [softLoading, setSoftLoading] = soft;
  const [designation, setDesignation] = desig;
  const [toastAppear, setToastAppear] = toast;

  // functions
  useEffect(() => {
    async function fetchDesig() {
      if (sessionStorage.getItem("token")) {
        const req = await fetch("https://ezsupply-backend.herokuapp.com/api/info", {
          headers: {
            'x-access-token': sessionStorage.getItem("token"),
          }
        })
        const data = await req.json();
        setDesignation(data.user.type);
        setUserData(data.user);
      }
    };
    fetchDesig();
  }, []);
  
  console.log(userData.email);
    useEffect(() => {
      if (toastAppear) {
        setTimeout(() => {
          setToastAppear(false);
        }, 2000);
      }
    }, [toastAppear]);

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
