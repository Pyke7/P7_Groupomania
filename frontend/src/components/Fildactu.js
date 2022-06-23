import "../styles/Fildactu.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../components/Post";

function Fildactu() {
  const [data, setData] = useState();
  console.log(data);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/post")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="fildactu">
        {data?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
}

export default Fildactu;
