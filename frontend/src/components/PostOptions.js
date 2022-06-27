import Popup from "reactjs-popup";
import { BsThreeDots } from 'react-icons/bs'
import '../styles/Post.css'
import axios from "axios";

function PostOptions( post ) {

  function handleClick() {
    const deleteOption = document.getElementsByClassName('delete')
    const postId = deleteOption[0].getAttribute("id")
    axios.delete(`http://localhost:3000/api/post/${postId}`)
      .then((res) => {
        console.log(res.data.message);
        document.location.href="/";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Popup
      trigger={ <div className="dotContainer"> <BsThreeDots className="threeDots"/></div>} modal className="popup-options">
      <div>
        <p className="modify" >Modify</p>
        <p className="delete" id={post.post.id} onClick={() => {
          if(window.confirm('Do you want to delete this post ?')) {
            handleClick();
          }
        }}>
          Delete
        </p>
      </div>
    </Popup>
  );
}

export default PostOptions;
