import Popup from "reactjs-popup";
import { FaUser } from 'react-icons/fa';
import '../styles/Logout.css';
import axios from 'axios';
import { useState } from 'react';

function PopupLogout() {
    const [email, SetEmail] = useState();

  axios
    .get("http://localhost:3000/api/user/")
    .then((res) => {
      SetEmail(res.data.email);
    })
    .catch((err) => {
      console.log(err);
    });


    function handleClick() {
        localStorage.clear();
        document.location.href ='/login';
    }
    
    return (
    <Popup
      trigger={open => (
        <div className="iconContainer"><FaUser className="userIcon" /></div>
      )}
      position="bottom center"
      closeOnDocumentClick
    >
      <div>
        <p className="email">{email}</p>
        <p onClick={handleClick} className='btn-logout'>Logout</p>
      </div>
    </Popup> 
    )
};

export default PopupLogout;
