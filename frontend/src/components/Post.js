import { FaThumbsUp } from "react-icons/fa";

function Post({ post }) {

  return (
    <div className="post">
      <div>
        <p>
          {post.prenom} {post.nom}
        </p>
        <p>{post.timestamps}</p>
      </div>
      <div>{post.message}</div>
      <div>
        <img src={post.imageUrl} alt="post" />
      </div>
      <div>
        <FaThumbsUp />
      </div>
    </div>
  );
}

export default Post;
