import Popup from "reactjs-popup";
import { BsThreeDots } from 'react-icons/bs'
import '../styles/Post.css'

function PostOptions() {
  return (
    <Popup
      trigger={ <div className="dotContainer"> <BsThreeDots className="threeDots"/></div>} modal>
      <div>
        <p>Modifier</p>
        <p>
          Supprimer
        </p>
      </div>
    </Popup>
  );
}

export default PostOptions;
