import React, { useState } from "react";
import axios from "axios";
import "../../css/auth/Auth.css";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const toggleModal = () => setIsOpen(!isOpen);

  // FIXED: Removed ": React.ChangeEvent<HTMLInputElement>"
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FIXED: Removed ": React.FormEvent"
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const response = await axios.post(
        `http://localhost:5000${endpoint}`,
        formData,
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      alert(`Success! Welcome, ${response.data.username}`);
      setIsOpen(false);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <button
          className="auth-btn signup"
          onClick={() => {
            setIsLogin(false);
            toggleModal();
          }}
        >
          Signup
        </button>
        <button
          className="auth-btn login"
          onClick={() => {
            setIsLogin(true);
            toggleModal();
          }}
        >
          Login
        </button>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div
            className="modal-content card-glass animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-gradient text-2xl font-bold mb-6">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input-modern"
                  onChange={handleChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input-modern"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input-modern"
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn-primary mt-4">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <p className="mt-4 text-sm text-gray-400 text-center">
              {isLogin ? "New to Synthesia?" : "Already have an account?"}
              <span
                className="text-purple-400 ml-2 cursor-pointer hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create one" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
