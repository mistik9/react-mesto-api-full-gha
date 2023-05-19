import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";



function Header({ email, onLogOut, loggedIn, children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function openMenu() {
    setIsMenuOpen(true)
  }

  return (
    <header className="header">
      <img src={logo} alt="лого" className="header__logo" />
{children}
      <div className={!isMenuOpen ? "header__menu-items" : "header__menu-items_hide header__menu-items"}>
        <p className="header__menu-item header__menu-item_email">{email}</p>
        <Link to="/signin" className={loggedIn ? "header__menu-item" : "header__menu-item_hide header__menu-item"} onClick={onLogOut}>Выйти</Link>
      </div>
      <button className={isMenuOpen ? "header__menu header__menu_hide " : "header__menu"} onClick={openMenu}>
        <span className="header__menu-line"></span>
        <span className="header__menu-line"></span>
        <span className="header__menu-line"></span>
      </button>
    </header>
  )
}

export default Header;





