import logo from '../assets/logo-groupomania/icon-left-font.png';
import '../styles/Header.css';
import PopupLogout from "../components/Logout";

function Header() {
    return(
        <div className='header-container'>
            <img src={logo} alt="logo groupomania avec icone à gauche"/>
            <PopupLogout />
        </div>
    )
};

export default Header;