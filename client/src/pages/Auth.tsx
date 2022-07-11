import { useLocation } from "react-router-dom";
import useInputState from "../hooks/useInputState";

export default function Auth() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return <div className="auth">{isLoginPage ? <Login /> : <Register />}</div>;
}

function Login() {
  const email = useInputState();
  const password = useInputState();

  return <div></div>;
}

function Register() {
  const name = useInputState();
  const email = useInputState();
  const password = useInputState();
  const confirmPassword = useInputState();

  return <div></div>;
}
