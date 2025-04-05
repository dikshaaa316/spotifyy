import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from "react";


const Login = () => {
    const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (username && email && password) {
      navigate("/home");
    } else {
      alert("Enter all credentials");
    }
  };

  return (
    <div className='userform'>
        <h3 className='heading'>LOGIN PAGE</h3>
        <form className="loginform" onSubmit={handleSubmit}

      >
       <div className='input'> 
            <label htmlFor='name'>Username:</label>
            <input type="text" id="name" placeholder='Enter Username' onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor='email'>Email:</label>
            <input type="text" id="email"  placeholder='Enter Email'  onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor='password'>Password:</label>
            <input type="text" id="password" placeholder='Create Password'  onChange={(e) => setPassword(e.target.value)}/>

            <button type="submit" className="btn">LOGIN</button>

        </div>
        </form>
    </div>
  )
}

export default Login;