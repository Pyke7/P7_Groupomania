import "../styles/auth.css";
import logo from "../assets/logo-groupomania/icon-above-font.png";
import { Link } from "react-router-dom";
import FormSignup from "../components/FormSignup";

function Signup() {
  return (
    <div className="container">
      <div className="auth-container">
        <img src={logo} alt="logo du site groupomania" />
        <FormSignup />
        <p className="otherOptionAuth">You already have an account ?</p>
        <Link to="/login">SIGN IN</Link>
      </div>
    </div>
  );
}

export default Signup;
