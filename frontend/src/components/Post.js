import { FaThumbsUp } from "react-icons/fa";
import '../styles/Post.css';
import PostOptions from "../components/PostOptions";

function Post({ post }) {
  const date = new Date(post.timestamps)
  const newDate = date.toDateString();

  return (
    <div className="post">
      <div className="post-infos">
        <PostOptions />
        <p className="post-infos-name">
          {post.prenom} {post.nom}
        </p>
        <p className="post-infos-date">{ newDate }</p>
      </div>
      <div className="post-message">{post.message}</div>
      <div>
        <img src={post.imageUrl} alt="post" />
      </div>
      <div>
        <FaThumbsUp className="pouceBleu"/>
      </div>
    </div>
  );
}

export default Post;
