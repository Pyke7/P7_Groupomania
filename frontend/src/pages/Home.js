

function Home() {
    const tokenCheck = localStorage.getItem('token');
    if (!tokenCheck || tokenCheck === "") {
        document.location.href = "/login";
    }
    return (
        <div>
            
        </div>
    );
};

export default Home;