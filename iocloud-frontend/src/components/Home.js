import React from "react";
import { useNavigate } from "react-router-dom";
import Noty from "./Noty";
import "../styles/Home.css";


const Home = (props) => {
  
  const { showAlert } = props;
  const navigate = useNavigate();
  return (
    
    <div className="home-container">
     
      {!localStorage.getItem("token") ? (
       
        <div className="text-center my-5">
          <h1>Deary Diary</h1>
          <h3> Login to create your own Dear Diary!</h3>
          <p className="text-muted">
            Write your thoughts, capture your moments, and make them yours.
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/auth")}
          >
            Go to Login
          </button>
        </div>  
      ) : (
        <Noty showAlert={showAlert} />
      )}
  </div>
  );
};

export default Home;
