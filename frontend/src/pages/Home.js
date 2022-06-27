import Header from "../components/Header";
import PostEdit from "../components/PostEdit";
import Fildactu from "../components/Fildactu";
import Footer from "../components/Footer";
import "../styles/Home.css";

function Home() {
  const tokenCheck = localStorage.getItem("token");
  if (!tokenCheck || tokenCheck === "") {
    document.location.href = "/login";
  }

  return (
    <div className="home">
      <Header />
      <main>
        <PostEdit />
        <Fildactu />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
