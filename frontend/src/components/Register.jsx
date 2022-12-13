import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

    const [name,setName] = useState();
    const [password, setPassword] = useState("");
    const [confirm,setConfirm] = useState("");
    const [age, setAge] = useState();
    const [email,setEmail] = useState();
    const [pic, setPic] = useState();
    const [picLoading,setPicLoading] = useState(false);
    const [passTick, setPassTick] = useState(false);
    const [confirmPassTick, setConfirmPassTick] = useState(false);
    const [ageTick, setAgeTick] = useState(false);
    const [emailTick, setEmailTick] = useState(false);
    const [warnVisible, setWarnVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [warnings, setwarnings] = useState("Please fill all mandatory fields");

    const navigate = useNavigate();

    const submithandler = async () => {
        setVisible(false);
        setWarnVisible(false);
        if(!name || !email || !age || !password || !confirm){
           console.log("Please fill all the fields");
           setVisible(true);
           return;
        }

        if(ageTick === false){
            setWarnVisible(true);
            return;
        }
        
        if(emailTick === false){
            setwarnings("Please enter valid email");
            setVisible(true);
            return;
        }

        if(passTick===false){
            setwarnings("Please enter valid password");
            setVisible(true);
            return;
        }

        if(confirmPassTick === false){
            setwarnings("Password and Confirm Password should be same");
            setVisible(true);
            return;
        }

        try {
            setVisible(false);
            setPicLoading(true);
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };

            const { data } = await axios.post(
              "http://localhost:10000/api/user",
              {
                name:name,
                email:email,
                password:password,
                age:age,
                pic:pic,
              },
              config
            );
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            console.log("Registration Successfull")
            navigate("/User");
        } catch (error) {
            console.log(error);
            setPicLoading(false);
        }
    }

    const postPic = (pics) => {
      setPicLoading(true);
      if (pics === undefined) {
        return;
      }
      console.log(pics);
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "chat-app");
        data.append("cloud_name", "pankajcoder");
        fetch("https://api.cloudinary.com/v1_1/pankajcoder/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            console.log(data.url.toString());
            setPicLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setPicLoading(false);
          });
      } else {
        setPicLoading(false);
        return;
      }
    };

    useEffect(() => {
      let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

      if (confirm === password && confirm.length >= 7) {
        setConfirmPassTick(true);
      } else {
        setConfirmPassTick(false);
      }

      if (password.length >= 8) {
        setPassTick(true);
      } else {
        setPassTick(false);
      }

      if (reg.test(email) === false) {
        setEmailTick(false);
      } else {
        setEmailTick(true);
      }

      if(age>17 && age<66){
        setAgeTick(true);
        setWarnVisible(false);
      }else{
        setAgeTick(false);
      }

    }, [confirm, password, age, email]);


    return (
      <div className="form-container">
        <div className="signin-signup">
          <form action="" className="signup-form" id="sign-up">
            <h1>Create Account</h1>
            <div className="form-control">
              <i className="fas fa-user"></i>
              <input
                className="input-text"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div
              className={`${
                warnVisible ? "form-control-warning" : "form-control"
              }`}
            >
              <i className="fas fa-user"></i>
              <input
                className="input-text"
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <span
                className={`${
                  ageTick ? "material-symbols-outlined tick" : "display"
                }`}
              >
                check
              </span>
            </div>
            <div className={`${warnVisible ? "warning" : "display"}`}>
              <text className="warntext">
                * Age should be in between 18 to 65
              </text>
            </div>
            <div className="form-control">
              <i className="fas fa-envelope"></i>
              <input
                className="input-text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
              <span
                className={`${
                  emailTick ? "material-symbols-outlined tick" : "display"
                }`}
              >
                check
              </span>
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
                placeholder="Password (at least 8 character)"
              />
              <span
                className={`${
                  passTick ? "material-symbols-outlined tick" : "display"
                }`}
              >
                check
              </span>
            </div>
            <div className="form-control">
              <i className="fas fa-lock"></i>
              <input
                className="input-text"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
                type="password"
                placeholder="Confirm Password"
              />
              <span
                className={`${
                  confirmPassTick ? "material-symbols-outlined tick" : "display"
                }`}
              >
                check
              </span>
            </div>
            <div className="form-control">
              <i className="fas fa-user"></i>
              <input
                className="input-text"
                type="file"
                accept="image/*"
                onChange={(e) => postPic(e.target.files[0])}
              />
            </div>
            <div className={`${visible ? "warning" : "display"}`}>
              <text className="warntext">* {warnings}</text>
            </div>
            <div className="login-btn">
              <button
                className={`${picLoading ? "display" : "btn"}`}
                type="button"
                onClick={submithandler}
              >
                Create an Account
              </button>
            </div>

            <div className="platforms">
              <h4 id="signin-link" onClick={() => navigate("/Login")}>
                Already have an account?Sign in.
              </h4>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Register;
