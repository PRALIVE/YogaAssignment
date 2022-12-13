import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){

   const [email,setEmail] = useState();
   const [password, setPassword] = useState();
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const submithandler = async() => {
         try {
          setLoading(true);
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          const { data } = await axios.post(
            "http://localhost:10000/api/user/login",
            {
              email: email,
              password: password,
            },
            config
          );
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          console.log("Login Successfully");
          navigate("/User");
         } catch (error) {
          console.log(error);
          setLoading(false);
         }
   }

    return (
      <div className="form-container">
        <div className="signin-signup">
          <form action="" className="signup-form" id="sign-up">
            <h1>Sign In</h1>
            <div className="form-control">
              <i className="fas fa-envelope"></i>
              <input
                className="input-text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="form-control">
              <i className="fas fa-lock"></i>
              <input
                className="input-text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="login-btn">
              <button
                onClick={submithandler}
                className={`${loading ? "display" : "btn"}`}
                type="button"
              >
                Login
              </button>
            </div>

            <div className="login-btn">
              <button
                className="btn"
                type="button"
                onClick={() => navigate("/Signup")}
              >
                new user Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}