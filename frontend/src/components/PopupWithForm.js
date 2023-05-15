import React, { Children } from "react";

function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {

  return (
    <section className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__content" name={name} onSubmit={onSubmit} >
          {children}
          <button className="popup__save" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm;