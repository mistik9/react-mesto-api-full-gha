import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState(currentUser.name);
    const [about, setAbout] = React.useState(currentUser.about);

    React.useEffect(() => {
        setName(currentUser.name || "");
        setAbout(currentUser.about || "");
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ name, about });

    }
    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeAbout(e) {
        setAbout(e.target.value);
    }

    return (
        <PopupWithForm
            name="user-info"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" id="name" placeholder="Имя" className="popup__input popup__input_type_name" required
                minLength="2" maxLength="40" value={name || ""} onChange={handleChangeName} />
            <span id="name-error" className="error"></span>
            <input type="text" id="about" placeholder="Работа" className="popup__input popup__input_type_about" required
                minLength="2" maxLength="200" value={about || ""} onChange={handleChangeAbout} />
            <span id="about-error" className="error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup;