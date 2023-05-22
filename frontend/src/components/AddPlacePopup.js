import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name={"user-image"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" id="pic" placeholder="Название" className="popup__input popup__input_type_place"
        minLength="2" maxLength="30" value={name} onChange={handleChangeName} />
      <span id="pic-error" className="error"></span>
      <input type="url" id="link" placeholder="Ссылка на картинку" className="popup__input popup__input_type_url"
        value={link} onChange={handleChangeLink} />
      <span id="link-error" className="error"></span>
    </PopupWithForm>
  )
}
export default AddPlacePopup;