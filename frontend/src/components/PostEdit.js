import Popup from "reactjs-popup";
import axios from "axios";
import { useEffect, useState } from 'react';
import '../styles/PostEdit.css';
import PostForm from '../components/PostForm';

function PostEdit() {
  const [prenom, SetPrenom] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/")
      .then((res) => {
        SetPrenom(res.data.prenom);
      })
      .catch((err) => {
        console.log(err);
      });
  } , [])

    return (
    <Popup trigger={<div className="postedit"> Quoi de neuf, {prenom} ? </div>} modal position="center center" className="popup-post">
    <PostForm />
  </Popup>
  )
}

export default PostEdit;
