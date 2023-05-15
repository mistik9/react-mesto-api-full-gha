import React, { Children } from "react";

function InfoTooltip ({message,  isOpen, onClose, isSuccess}) {

  return (
    <section className={`popup popup_type_info  ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
<div className={`popup__icon ${isSuccess ? "popup__icon_success ": ""}`}> </div>
<p className="popup__message">{message}</p>
     
      </div>
    </section>
  )
}

export default InfoTooltip;