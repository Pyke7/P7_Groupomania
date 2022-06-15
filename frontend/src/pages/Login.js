// import { Fragment } from 'react';
import '../styles/login.css';

function Login() {
    return (
        <div className='login-container'>
            <img src="../assets/logo-groupomania/icon-above-font.png" alt="logo du site groupomania"/>
            <form method = "post">
                <input type="email" name="email" placeholder="email"></input>
                <input type="password" name="password" placeholder="password"></input> 
            </form>
            <p>Don't have an account ?</p>
            <a href="/signup" title="SIGNUP">SIGN UP</a>
        </div>
    )
};

export default Login;