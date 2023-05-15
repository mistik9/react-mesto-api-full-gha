import React from "react";
import add from "../images/add.svg"
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, cards, onCardClick, onDeleteClick, onCardLike }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <main className="content">
                <section className="profile">
                    <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} >
                        <button
                            className="profile__edit-avatar-button"
                            type="button"
                            aria-label="Edit avatar"
                            onClick={onEditAvatar}>
                        </button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__info-name">{currentUser.name} </h1>
                        <button
                            className="profile__edit-button"
                            type="button"
                            aria-label="Edit profile"
                            onClick={onEditProfile}>
                        </button>
                        <p className="profile__info-about">{currentUser.about}</p>
                    </div>
                    <button
                        className="profile__add-button"
                        type="button"
                        onClick={onAddPlace}>
                        <img src={add} alt="кнопка добавить" /></button>
                </section>
                <section className="elements">
                    <ul className="elements__container">
                        {cards.map((card) =>
                            <Card
                                key={card._id}
                                card={card}
                                src={card.link}
                                title={card.name}
                                like={card.likes}
                                owner={card.owner}
                                onCardClick={onCardClick}
                                onDeleteClick={onDeleteClick}
                                onCardLike={onCardLike}
                            />
                        )}
                    </ul>
                </section>
            </main>
        </>
    )
}

export default Main;