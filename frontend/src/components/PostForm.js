import {FaFileImage} from 'react-icons';
import axios from 'axios';
import '../styles/PostForm.css';
import { useForm } from 'react-hook-form';

function PostForm() {
    const {register, handleSubmit, errors} = useForm();
    const onSubmit = (data) => {
        axios.post('http://localhost:3000/api/post', data)
            .then((resultat) => {
                console.log(resultat.data.message);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return(
        <form  onSubmit={handleSubmit(onSubmit)} className='postform'>
            <p className='post-title'>Create a post</p>
            <textarea {...register("message")} name="message" className='contentOfPost' maxLength='500' placeholder='Your super post content...'></textarea>
            <input type="submit" value="POST" className='btn-post'/>
        </form>
    )
}

export default PostForm;