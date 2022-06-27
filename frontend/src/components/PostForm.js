import { BsFileImageFill } from "react-icons/bs";
import axios from "axios";
import "../styles/PostForm.css";
import { useForm } from "react-hook-form";

function PostForm() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    if (data.message === "" && !data.file[0]) {
      return
    }

    let bodyFormData = new FormData();
    bodyFormData.append("message", data.message);
    bodyFormData.append("image", data.file[0]);

    axios.post('http://localhost:3000/api/post', bodyFormData)
      .then((resultat) => {
        console.log(resultat.data.message);
        document.location.href="/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="postform">
      <p className="post-title">Create a post</p>
      <textarea
        {...register("message")}
        id="message"
        name="message"
        className="contentOfPost"
        maxLength="500"
        placeholder="Your super post content..."
      ></textarea>
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
      <input
        type="submit"
        value="POST"
        className="btn-post"
      />
    </form>
  );
}

export default PostForm;
