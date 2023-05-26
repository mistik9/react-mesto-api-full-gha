import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onDeleteClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  console.log('current ==>', currentUser._id)
  console.log('card.owner ==>', card.owner )
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__bottom-like ${isLiked && "element__bottom-like_active"}`
  );
  const cardDeleteButtonClassName = (`element__delete ${isOwn ? "element__delete_hidden" : ""}`)

  function handleClick() {
    onCardClick(card);
  }
  function handleDeleteClick() {
    onDeleteClick(card)
  }
  function handleLikeClick() {
    onCardLike(card)
  }

  return (
    <li className="element">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__bottom">
        <p className="element__bottom-title">{card.name}</p>
        <div className="element__bottom-like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__bottom-like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card;