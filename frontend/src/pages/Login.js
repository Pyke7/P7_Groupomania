import "../styles/auth.css";
import logo from "../assets/logo-groupomania/icon-above-font.png";
import { Link } from "react-router-dom";
import FormLogin from "../components/FormLogin";

function Login() {
  return (
    <div className="container">
      <div className="auth-container">
        <img src={logo} alt="logo du site groupomania" />
        <FormLogin />
        <p className="otherOptionAuth">Don't have an account ?</p>
        <Link to="/signup">SIGN UP</Link>
      </div>
    </div>
  );
}

export default Login;
