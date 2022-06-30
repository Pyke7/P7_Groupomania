import { FaThumbsUp } from "react-icons/fa";
import "../styles/Post.css";
import axios from "axios";
import { useState } from "react";
import Popup from "reactjs-popup";
import { BsThreeDots } from "react-icons/bs";
import { BsFileImageFill } from "react-icons/bs";
import { useForm } from "react-hook-form";

function Post({ post }) {
  const date = new Date(post.timestamps);
  const newDate = date.toDateString();

  const [userId, setUserId] = useState();
  const [isAdmin, setIsAdmin] = useState();

  const [isUpdated, setIsUpdated] = useState(false); 

  const [likes, setLikes] = useState(post.likes);

  const { register, handleSubmit, errors } = useForm(); //modification de post
  const onSubmit = (data) => {
    console.log(data.message);
    if (data.message === "" && !data.file[0]) {
      return;
    }

    if (!data.file.length) {
      if (data.message === post.message) {
        return;
      }
      const message = data.message;
      const dataForAxios = { message };

      axios
        .put(`http://localhost:3000/api/post/${post.id}`, dataForAxios) //sans fichier image
        .then((res) => {
          console.log("requete réussie");
          document.location.href = "/";        
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (data.file) {
      let bodyFormData = new FormData();
      bodyFormData.append("message", data.message);
      bodyFormData.append("image", data.file[0]);

      axios
        .put(`http://localhost:3000/api/post/${post.id}`, bodyFormData) //avec fichier image
        .then((res) => {
          console.log("requete réussie");
          document.location.href = "/"
          
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  function getUser() { //affichage des options de modifications et suppression en fonction du grade utilisateur
    axios
      .get("http://localhost:3000/api/user")
      .then((res) => {
        setUserId(res.data.id);
        setIsAdmin(res.data.isAdmin);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUser();

  function deletePost() { //suppression du post
    const deleteOption = document.getElementsByClassName("delete");
    const postId = deleteOption[0].getAttribute("id");
    axios
      .delete(`http://localhost:3000/api/post/${postId}`)
      .then((res) => {
        console.log(res.data.message);
        document.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  }
 
  const likePost = () => { //liker un post

    axios.post(`http://localhost:3000/api/post/${post.id}/like`)
      .then(res => {
        setLikes(res.data.likes);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="post" id={post.id}>
      <div className="post-infos">
        {post.user_id === userId || isAdmin ? (
          <Popup
            trigger={
              <div className="dotContainer">
                {" "}
                <BsThreeDots className="threeDots" />
              </div>
            }
            modal
            className="popup-options"
          >
            <div>
              <p className="modify" onClick={() => setIsUpdated(!isUpdated)}>
                Modify
              </p>
              <p
                className="delete"
                id={post.id}
                onClick={() => {
                  if (window.confirm("Do you want to delete this post ?")) {
                    deletePost();
                  }
                }}
              >
                Delete
              </p>
            </div>
          </Popup>
        ) : null}
        <p className="post-infos-name">
          {post.prenom} {post.nom}
        </p>
        <p className="post-infos-date">{newDate}</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="containerForPostAndModify"
      >
        {isUpdated === false && <p className="post-message">{post.message}</p>}
        {isUpdated && (
          <textarea
            {...register("message")}
            id="message"
            name="message"
            className="contentOfPost"
            maxLength="500"
            defaultValue={post.message}
          ></textarea>
        )}

        {isUpdated === false && (
          <div>{post.imageUrl ? <img src={post.imageUrl} alt="" /> : null}</div>
        )}
        {isUpdated && (
          <div className="container-input-bouton">
            <div className="container-image-input">
              <label htmlFor="file" className="insert-image">
                <p className="label-string">Add an image to your post</p>
                <BsFileImageFill className="fileIcon" />
              </label>
              <input
                {...register("file")}
                id="file"
                name="file"
                type="file"
                className="imageOfPost"
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
            <input type="submit" value="SAVE CHANGES" className="btn-save" />
          </div>
        )}
      </form>
      {isUpdated === false ? <div><FaThumbsUp id="thumb" className="thumb" onClick={likePost}/><span className="nb-likes">{likes}</span></div> : null}
    </div>
  );
}

export default Post;
