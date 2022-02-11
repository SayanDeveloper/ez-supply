import React, {useState, useEffect, useRef, useContext} from 'react';
import {Link} from 'react-router-dom';
import {GlobalContext} from '../context/provider';
import SolidLoader from './SolidLoader';

function Login() {
    // states
    const [designation, setDesignation] = useState(null);
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const [localLoader, setLocalLoader] = useState(true);

    // Refs
    const desRef = useRef();
    const btnGrp = useRef();

    // context
    const {solid, soft} = useContext(GlobalContext);
    const [loading, setLoading] = solid;
    const [softLoading, setSoftLoading] = soft;

    // functions
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            window.location.href = "/";
        }
        setTimeout(() => {
            setLocalLoader(false);
        }, 300)
    }, [])

    const appearNext = (des) => {
        
        btnGrp.current.style.opacity = "0";
        setTimeout(() => {
            setDesignation(des);
        }, 200);
        console.log(des);
    }

    async function loginUser(e) {
        e.preventDefault();
        setSoftLoading(true);
        const response = await fetch("https://ezsupply-backend.herokuapp.com/api/login", {
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
            sessionStorage.setItem('token', data.user);
            setInterval(() => {
                window.location.href = "/";
            }, 500);
        }   else {
            alert("Please enter correct credentials");
        }
        console.log(data);
    }

    return (
    <div className='login-bg'>
        {localLoader ? 
        <SolidLoader />
        : ""}
        <div className='login-container'>
            <h1>LOGIN</h1>
            {designation ? 
                <p ref={desRef} className='text-center login-desig'>{designation}</p>
                :
                ""
            }

            {designation ? 
            (
                <form className='login-form' onSubmit={loginUser}>
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
            )
            :
            <div className='desig-choose' ref={btnGrp}>
                <div onClick={() => appearNext("Manufacturer")} className='manufacturer text-center'>Login as Manufacturer</div>
                <div onClick={() => appearNext("Owner")} className='owner text-center'>Login as owner</div>
                <p>Don't Have an Account? <Link to="/register">Sign Up</Link></p>
            </div>
            }
        </div>
    </div>

    );
}

export default Login;
