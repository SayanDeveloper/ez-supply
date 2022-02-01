import React, {useState, useRef} from 'react';
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
    <div className='login-bg'>
      <div className='login-container'>
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
            </div>
            <input type="submit" value="Submit" />

        </form>
      </div>
    </div>
  );
}

export default Register;
