import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useInputState from "../hooks/useInputState";
import toast, { Toaster } from "react-hot-toast";
import { validateEmail } from "../utils/utilities";

export default function Auth() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="auth">
      <main>
        <img src={require("../assets/tv.png")} alt="TV illustration" />
        <section>{isLoginPage ? <Login /> : <Register />}</section>
      </main>
    </div>
  );
}

function Login() {
  const email = useInputState();
  const password = useInputState();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.value || !password.value)
      return toast.error("All fields are required");

    try {
      await auth?.login(email.value, password.value);
      navigate("/");
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="login">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          className="input"
          {...email.inputProps}
          type="text"
          placeholder="Email"
        />
        <input
          className="input"
          {...password.inputProps}
          type="password"
          placeholder="Password"
        />
        <button className="submit">Submit</button>
        <span className="switch">
          Don't have an account? <Link to="/register">Register</Link>{" "}
        </span>
      </form>
    </div>
  );
}

function Register() {
  const name = useInputState();
  const email = useInputState();
  const password = useInputState();
  const confirmPassword = useInputState();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !name.value ||
      !email.value ||
      !password.value ||
      !confirmPassword.value
    )
      return toast.error("All fields are required");

    if (!validateEmail(email.value)) return toast.error("Invalid email id");

    if (password.value !== confirmPassword.value)
      return toast.error("Passwords do not match");

    try {
      await auth?.login(email.value, password.value);
      navigate("/");
    } catch (err: any) {
      // err.response.data.message
      console.log(err);
    }
  };

  return (
    <div className="register">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          className="input"
          {...name.inputProps}
          type="text"
          placeholder="Name"
        />
        <input
          className="input"
          {...email.inputProps}
          type="text"
          placeholder="Email"
        />
        <input
          className="input"
          {...password.inputProps}
          type="password"
          placeholder="Password"
        />
        <input
          className="input"
          {...confirmPassword.inputProps}
          type="password"
          placeholder="Confirm Password"
        />
        <button className="submit">Submit</button>
        <span className="switch">
          Already have an account? <Link to="/login">Login</Link>{" "}
        </span>
      </form>
    </div>
  );
}
