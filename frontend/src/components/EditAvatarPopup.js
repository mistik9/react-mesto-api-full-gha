import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarInput.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"user-avatar"}
      title={"Редактировать аватар"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input ref={avatarInput} type="url" id="avatar" placeholder="Ссылка на аватар" className="popup__input popup__input_type_url" required />
      <span id="avatar-error" className="error"></span>
    </PopupWithForm>
  )
}
export default EditAvatarPopup;