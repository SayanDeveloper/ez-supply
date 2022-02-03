import React, {useEffect, useContext} from 'react';
import {GlobalContext} from "../context/provider";
import TopNav from  './TopNav';

function Dashboard() {
  // context
  const {solid, soft} = useContext(GlobalContext);
  const [loading, setLoading] = solid;
  const [softLoading, setSoftLoading] = soft;

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
    </>
  );
}

export default Dashboard;
