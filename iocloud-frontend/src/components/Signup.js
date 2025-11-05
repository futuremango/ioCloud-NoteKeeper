import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();
  const host = "http://localhost:5000";
  const [signup, setSignup] = useState({
    name: "",
    Cpassword: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !signup.name ||
      !signup.email ||
      !signup.password ||
      !signup.Cpassword
    ) {
      alert("Please fill all fields before signing up!");
      return;
    }
    if (signup.password !== signup.Cpassword) {
      alert("Passwords do not match!");
      return;
    }
    setLoading(true);
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: signup.name,
        email: signup.email,
        password: signup.password,
      }),
    });
    const json = await response.json();
    setLoading(false);
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.auth_token);
      navigate("/");
      showAlert("Account created successfully!", "success");
    } else {
      alert("Signup failed! Try again.");
      showAlert("Signup failed! Try again.", "danger");
    }
  };

  return (
    <div className="container">
      <h1>Create Account to have your own Dear Diary</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={signup.name}
            onChange={(e) => setSignup({ ...signup, name: e.target.value })}
            className="form-control"
            id="name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={signup.email}
            onChange={(e) => setSignup({ ...signup, email: e.target.value })}
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
            value={signup.password}
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confimInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            value={signup.Cpassword}
            onChange={(e) =>
              setSignup({ ...signup, Cpassword: e.target.value })
            }
            className="form-control"
            id="confimInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? "Signing up..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
