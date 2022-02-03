import React, {useEffect, useContext} from 'react';
import {GlobalContext} from "../context/provider";

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
    <div>
      Hey there 
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
