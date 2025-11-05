import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const { showAlert } = props;
  const host = "http://localhost:5000";
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // API Call
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    setLoading(false);
    console.log(json);
    if (json.success) {
      //save token & redirect
      localStorage.setItem("token", json.auth_token);
      navigate("/");
      showAlert("Logged in successfully!", "success");
    } else {
      //show error
      alert("Invalid Credentials!");
      showAlert("Invalid Credentials!", "danger");
    }
  };

  return (
    <div className="container">
      <h1>Login to continue in iCloud</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={(e) => {
              setCredentials({ ...credentials, email: e.target.value });
            }}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => {
              setCredentials({ ...credentials, password: e.target.value });
            }}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
