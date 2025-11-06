import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthPage.css";

const AuthPage = ({ showAlert }) => {
  const navigate = useNavigate();
  const host = "http://localhost:5000";

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    Cpassword: "",
  });

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: login.email,
        password: login.password,
      }),
    });
    const json = await response.json();
    setLoading(false);
    if (json.success) {
      localStorage.setItem("token", json.auth_token);
      navigate("/");
      showAlert("Logged in successfully!", "success");
    } else {
      showAlert("Invalid Credentials!", "danger");
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();

    if (
      !signup.name ||
      !signup.email ||
      !signup.password ||
      !signup.Cpassword
    ) {
      alert("Please fill all fields!");
      return;
    }
    if (signup.password !== signup.Cpassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: signup.name,
        email: signup.email,
        password: signup.password,
      }),
    });
    const json = await response.json();
    setLoading(false);
    if (json.success) {
      localStorage.setItem("token", json.auth_token);
      navigate("/");
      showAlert("Account created successfully!", "success");
    } else {
      showAlert("Signup failed! Try again.", "danger");
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center">
      <div className={`auth-container ${isSignUp ? "right-panel-active" : ""}`}>
        <div className="desktop-view">
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form onSubmit={handleSignup}>
              <h2>Create Account</h2>
              <input
                type="text"
                placeholder="Name"
                value={signup.name}
                onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signup.email}
                onChange={(e) =>
                  setSignup({ ...signup, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signup.password}
                onChange={(e) =>
                  setSignup({ ...signup, password: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={signup.Cpassword}
                onChange={(e) =>
                  setSignup({ ...signup, Cpassword: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="btn-glow btn btn-primary mt-2"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </div>

          {/* Login Form */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin}>
              <h2>Sign In</h2>
              <input
                type="email"
                placeholder="Email"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>

          {/* Overlay Panel */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h2>Welcome Back!</h2>
                <p>To keep connected with us, please login with your info</p>
                <button
                  className="btn btn-outline-light mt-2"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h2>Hello, Friend!</h2>
                <p>Enter your details and start your journey with us</p>
                <button
                  className="btn btn-outline-light mt-2"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-view">
          {isSignUp ? (
            <form onSubmit={handleSignup} className="mobile-form">
              <h2>Create Account</h2>
              <input
                type="text"
                placeholder="Name"
                value={signup.name}
                onChange={(e) => setSignup({ ...signup, name: e.target.value })}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={signup.email}
                onChange={(e) =>
                  setSignup({ ...signup, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={signup.password}
                onChange={(e) =>
                  setSignup({ ...signup, password: e.target.value })
                }
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={signup.Cpassword}
                onChange={(e) =>
                  setSignup({ ...signup, Cpassword: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="btn-glow btn btn-primary mt-2"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              <p className="toggle-text mt-3">
                Already have an account?{" "}
                <span onClick={() => setIsSignUp(false)}>Login</span>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="mobile-form">
              <h2>Sign In</h2>
              <input
                type="email"
                placeholder="Email"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                required
              />
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="toggle-text mt-3">
                Don’t have an account?{" "}
                <span onClick={() => setIsSignUp(true)}>Create one</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
