import React from "react";
import { useNavigate } from "react-router-dom";
import Noty from "./Noty";

const Home = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();
  return (
    <div>
      {!localStorage.getItem("token") ? (
        <div className="text-center my-5">
          <h3> Login to create your own Dear Diary!</h3>
          <p className="text-muted">
            Write your thoughts, capture your moments, and make them yours.
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/login")}
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
