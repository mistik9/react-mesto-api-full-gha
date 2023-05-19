import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function Register({ onRegister }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ email, password })
    }

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    return (
        <div>
            <Header>
            <Link to="/signin" className="header__menu-item">Войти</Link>
            </Header>
            <div className="login content">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__content" onSubmit={handleSubmit} >
                    <input type="text" id="email" placeholder="Email" className="login__input login__input_type_email" required
                        minLength="2" maxLength="40" value={email} onChange={handleChangeEmail} />
                    <span id="name-error" className="error"></span>
                    <input type="password" id="password " placeholder="Пароль" className="login__input login__input_type_password" required
                        minLength="2" maxLength="200" value={password} onChange={handleChangePassword} />
                    <span id="about-error" className="error"></span>
                    <button className="login__save" type="submit">Зарегистрироваться</button>
                </form>
                <div className="login__signin">
                    <p className="login__sign-in-text">Уже зарегистрированы? </p>
                    <Link to="/register" className="login__sign-in-link"> Войти</Link>
                </div>
            </div>
        </div>

    )
}
export default Register;
