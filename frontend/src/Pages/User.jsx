import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserPage() {

    const data = localStorage.getItem("userInfo");
    const user = JSON.parse(data);

    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    var today = new Date();
    var currentMonth = today.getMonth();
    const currMonth = monthNames[currentMonth];

    const navigate = useNavigate();

    const [check1,setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [check3, setCheck3] = useState(false);
    const [check4, setCheck4] = useState(false);
    const [check5, setCheck5] = useState(false);
    const [check6, setCheck6] = useState(false);
    const[visible,setVisible] = useState(false);
    const [batch,setBatch] = useState(user.batch);
    const [refresh, setRefresh] = useState(false); 
    const [warning, setWarning] = useState("");
    const [warnvisible, setWarnvisible] = useState(false);
    const [payVisible, setPayVisible] = useState(false);

    function handlecheck(e){
        if(e===1){
            setCheck1(true);
            setCheck2(false);
            setCheck3(false);
            setCheck4(false);
            setBatch("6AM - 7AM");
        }

        if(e===2){
           setCheck1(false);
           setCheck2(true);
           setCheck3(false);
           setCheck4(false); 
           setBatch("7AM - 8AM");
        }

        if (e === 3) {
          setCheck1(false);
          setCheck2(false);
          setCheck3(true);
          setCheck4(false);
          setBatch("8AM - 9AM");
        }

        if (e === 4) {
          setCheck1(false);
          setCheck2(false);
          setCheck3(false);
          setCheck4(true);
          setBatch("5PM - 6PM");
        }
    }

   async function handlenewmonth(){
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };

          const { data } = await axios.post(
            "http://localhost:10000/api/user/newpayment",
            {
              email: user.email,
            },
            config
          );
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          console.log("New Month arrived Successfully");
          setPayVisible(true);
          setRefresh(!refresh);
        } catch (error) {
          console.log(error);
        }
 
   }
  
   async function handlepayment(e){
        if(e === 5){
        setCheck5(true);
        setCheck6(false)

        if(batch === "none"){
            setWarning("Please select a batch first");
            setCheck5(false);
            setWarnvisible(true);
            return;
        }

        try {
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };

            const { data } = await axios.post(
            "http://localhost:10000/api/user/payment",
            {
              email: user.email,
              batch: batch,
              month : currMonth,
            },
            config
          );
          console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data));
          console.log("Payment Successfull");
          setRefresh(!refresh);
        } catch (error) {
            console.log(error);
        }
          setCheck6(false);
          setCheck5(false);
          setVisible(false);
          setWarnvisible(false);
        }

        if(e=== 6){
        setCheck6(true);
        setCheck5(false);
        setVisible(false);
        setCheck6(false);
        setCheck5(false);
        setWarnvisible(false);
        }
    }

    function handlelogout(){
      localStorage.removeItem("userInfo");
      navigate("/");
    }

    useEffect(()=>{
    const data = localStorage.getItem("userInfo");
    const user = JSON.parse(data);

    if(user.paymentStatus === "pending"){
        setPayVisible(true);
    }else{
        setPayVisible(false);
    }
    },[refresh]);

    useEffect(() => {
      if (currMonth !== user.month) {
        handlenewmonth();
      }
    },[]);

    return (
      <div className="user-main">
        <button className="btn logout" type="button" onClick={()=> handlelogout()}>
          Logout
        </button>
        <div className="sub-user">
          <div className="image-user">
            <img
              src={user.pic}
              height="100%"
              width="100%"
              alt="loading"
              className="img"
            ></img>
          </div>
          <div className="details">
            <text className="det-text">Name : {user.name}</text>
            <text className="det-text">Age : {user.age}</text>
            <text className="det-text">Email: {user.email}</text>
            <text className="det-text">Batch: {user.batch}</text>
            <text className="det-text">Payment: {user.paymentStatus}</text>
          </div>
        </div>
        <div className={`${!payVisible ? "display" : "pay-buttons"}`}>
          <div className="batch">
            <text className="det-text">Select a Batch</text>
            <div className="list-items">
              <input
                type="checkbox"
                checked={check1}
                onChange={() => handlecheck(1)}
              />
              <text className="batch-text">6AM - 7AM</text>
            </div>
            <div className="list-items">
              <input
                type="checkbox"
                checked={check2}
                onChange={() => handlecheck(2)}
              />
              <text className="batch-text">7AM - 8AM</text>
            </div>
            <div className="list-items">
              <input
                type="checkbox"
                checked={check3}
                onChange={() => handlecheck(3)}
              />
              <text className="batch-text">8AM - 9AM</text>
            </div>
            <div className="list-items">
              <input
                type="checkbox"
                checked={check4}
                onChange={() => handlecheck(4)}
              />
              <text className="batch-text">5PM - 6PM</text>
            </div>
          </div>
          <div className="payment">
            <button
              className="btn"
              type="button"
              onClick={() => setVisible(true)}
            >
              Pay Fees
            </button>
            <div className={`${!visible ? "display" : "list-item"}`}>
              <input
                type="checkbox"
                checked={check5}
                onChange={() => handlepayment(5)}
              />
              <text className="batch-text">Yes (to do the payment)</text>
            </div>
            <div className={`${!visible ? "display" : "list-item"}`}>
              <input
                type="checkbox"
                checked={check6}
                onChange={() => handlepayment(6)}
              />
              <text className="batch-text">No (to cancel the payment)</text>
            </div>
            <div className={`${!warnvisible ? "display" : "warning"}`}>
              <text className="warn">* {warning}</text>
            </div>
          </div>
        </div>
      </div>
    );
}