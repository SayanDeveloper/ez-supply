import React, {useState} from 'react';

function Login() {
    const [designation, setDesignation] = useState(null);
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");

    const appearNext = (des) => {
        setDesignation(des);
        console.log(des);
    }

    async function loginUser(e) {
        e.preventDefault();
        const response = await fetch("http://localhost:7000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: pass,
            }),
        })

        const data = await response.json();
        if (data.user) {
            localStorage.setItem('token', data.user);
            window.location.href = "/";
        }   else {
            alert("Please enter correct credentials");
        }
        console.log(data);
    }

    return (
    <div className='login-bg'>
        {/* <h2>Login</h2>
        <form onSubmit={loginUser}>
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

        </form> */}
        <div className='login-container'>
            <h1>LOGIN</h1>
            {designation ? 
                <p className='text-center'>Manufacturer</p>
                :
                ""
            }

            {designation ? 
            (
                <form onSubmit={loginUser}>
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
            )
            :
            <div className='desig-choose'>
                <div onClick={() => appearNext("Manufacturer")} className='manufacturer text-center'>Login as Manufacturer</div>
                <div onClick={() => appearNext("Owner")} className='owner text-center'>Login as owner</div>
            </div>
            }
        </div>
    </div>

    );
}

export default Login;
