import React, {useState} from 'react';
import '../styles/LoginRegister.css';

function Register() {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [loading, setLoading] = useState(false);

  async function registerUser(e) {
    
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:7000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: pass,
      }),
    })

    const data = await response.json();
    console.log(data);
    setTimeout(() => {
        setLoading(false);
        window.location.href = "/login";
    }, 300);
}

  return (
    <div>
        {loading ? (<div className='test'></div>) : ""}
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="name" 
        />
        <br/>
        <input 
          type="email"
          placeholder="email" 
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <br/>
        <input 
          type="password" 
          placeholder="password" 
          value={pass}
          onChange={(e) => setpass(e.target.value)}
        />
        <br/>
        <input type="submit" value="Submit" />

      </form>
    </div>
  );
}

export default Register;
