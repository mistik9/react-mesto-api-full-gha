import React from "react";

function ImagePopup({ card, onclose }) {

  return (
    <section className={`popup popup_type_show-image ${card ? "popup_opened" : ""}`} >
      <div className="popup__container popup__container_image">
        <button className="popup__close" type="button" onClick={onclose}></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__discription">{card?.name}</p>
      </div>
    </section>
  )
}

export default ImagePopup;