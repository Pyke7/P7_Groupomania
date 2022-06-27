import { FaThumbsUp } from "react-icons/fa";
import '../styles/Post.css';
import PostOptions from "../components/PostOptions";
import axios from "axios";
import { useState } from "react";

function Post({ post }) {
  const date = new Date(post.timestamps)
  const newDate = date.toDateString();

  const [userId, setUserId] = useState();
  const [isAdmin, setIsAdmin] = useState();

  function getUser() {
    axios.get('http://localhost:3000/api/user')
      .then (res => {
        setUserId(res.data.id)
        setIsAdmin(res.data.isAdmin)
      })
      .catch (err => {
        console.log(err)
      })
  }

  getUser();

  return (
    <div className="post" id={post.id}>
      <div className="post-infos">
        { post.user_id === userId || isAdmin ? <PostOptions post={post}/> : null}
        <p className="post-infos-name">
          {post.prenom} {post.nom}
        </p>
        <p className="post-infos-date">{ newDate }</p>
      </div>
      <p className="post-message">{post.message}</p>
      <div>
        { post.imageUrl ? <img src={post.imageUrl} alt="" /> : null}
      </div>
      <div>
        <FaThumbsUp className="pouceBleu"/>
      </div>
    </div>
  );
}

export default Post;
