import Header from "../components/Header";
import Footer from "../components/Footer";
import PostEdit from "../components/PostEdit";
import "../styles/Home.css";

function Home() {
  const tokenCheck = localStorage.getItem("token");
  if (!tokenCheck || tokenCheck === "") {
    document.location.href = "/login";
  }

  return (
    <div className="Home-container">
      <div className="home">
        <Header />
        <main>
        <PostEdit />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
