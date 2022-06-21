import {FaFileImage} from 'react-icons';
import axios from 'axios';
import '../styles/PostForm.css';

function PostForm() {
    return(
        <div className='postform'>
            <p>Create a post</p>
            <textarea></textarea>
            <input type="submit" value="POST"/>
        </div>
    )
}

export default PostForm;