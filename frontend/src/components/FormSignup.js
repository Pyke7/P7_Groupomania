import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import '../styles/FormAuth.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

function FormSignup() {
    const [error, setError] = useState();
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (data) => {
        axios.post('http://localhost:3000/api/user/login', data)
            .then((resultat) => {  
                localStorage.token=resultat.data.token;
                document.location.href ="/";
            })
            .catch((error) => {
                console.log(error);
                const errorMsg = error.response.data.message;
                setError(errorMsg);
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='formAuth'>
            <div className='inputLogo-Container'>
                <FaUser className='userIcon'/>
                <input {...register("firstName", {required: true})} type="text" name="firstName" placeholder="first name"/>
            </div>
            <div className='inputLogo-Container'>
                <FaUser className='userIcon'/>
                <input {...register("lastName", {required: true})} type="text" name="lastName" placeholder="last name"></input> 
            </div>
            <div className='inputLogo-Container'>
                <FaEnvelope />
                <input { ...register("email", {required: 'User not found'})} type="email" name="email" placeholder="email" />
            </div>
            {/* <p>{error}</p> */}
            <div className='inputLogo-Container'>
                <FaLock className='lock'/>
                <input {...register("password", {required: true})} type="password" name="password" placeholder="password"></input> 
            </div>
            <input type="submit" value="SIGN IN" className='btnAuth'/>
        </form>
    );
};

export default FormSignup;