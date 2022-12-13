import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main(){

    const navigate = useNavigate();

    return (
      <div className="main">
        <div className="sub-main">
          <div className="quote">
            <text className="quote-text">
              "Yoga is the ultimate practice. It simultaneously stimulates our
              inner light and quiets our overactive minds. It is both energy and
              rest. Yin and Yang. We feel the burn and find our bliss"
            </text>
          </div>
          <div className="buttons">
            <div className="reg-btn">
              <button
                className="btn"
                type="button"
                onClick={() => navigate("/Signup")}
              >
                Register
              </button>
            </div>
            <div className="log-btn">
              <button
                className="btn"
                type="button"
                onClick={() => navigate("/Login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};