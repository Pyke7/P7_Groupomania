import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import '../styles/FormAuth.css';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

function FormSignup() {
    const [error, setError] = useState();
    const {register, handleSubmit, formState: {errors} } = useForm();
    const onSubmit = (data) => {
        axios.post('http://localhost:3000/api/user/signup', data)
            .then((resultat) => {  
                document.location.href ="/login";
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
                <input {...register("prenom", {required: true})} type="text" name="prenom" placeholder="first name" aria-label='firstname'/>
            </div>
            {errors.prenom && <span className='errorsForm'>first name is not valid</span>}
            <div className='inputLogo-Container'>
                <FaUser className='userIcon'/>
                <input {...register("nom", {required: true})} type="text" name="nom" placeholder="last name" aria-label='lastname'></input> 
            </div>
            {errors.nom && <span className='errorsForm'>last name is not valid</span>}
            <div className='inputLogo-Container'>
                <FaEnvelope />
                <input { ...register("email", {required: true})} type="email" name="email" placeholder="email" aria-label='email'/>
            </div>
            {errors.email && <span className='errorsForm'>email is not valid</span>}
            <div className='inputLogo-Container'>
                <FaLock className='lock'/>
                <input {...register("password", {required: true})} type="password" name="password" placeholder="password" aria-label='password'></input> 
            </div>
            {errors.password && <span className='errorsForm'>password is not valid</span>}
            <input type="submit" value="SIGN IN" className='btnAuth'/>
        </form>
    );
};

export default FormSignup;