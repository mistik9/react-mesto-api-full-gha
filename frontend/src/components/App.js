import React from "react";
import Header from "./Header.js"
import Main from "./Main.js"
import Footer from "./Footer.js"
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register.js";
import Login from "./Login.js";
import auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const [infoMessage, setInfoMessage] = React.useState({ isSuccess: false, message: "" })

  const navigate = useNavigate()

  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  React.useEffect(() => {
    console.log()
    if (!loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData)
          setCards(cardsData)
        })
        .catch((err) => {
          console.log("Ошибочкa с загрузкой")
        })
    }
  }, [])



  //авторизация
  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((res) => {
        if (res.token) localStorage.setItem("token", res.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
        setUserData(res.user);
        setEmail(email);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true)
        setInfoMessage({ isSuccess: false, message: "Что-то пошло не так! Попробуйте ещё раз." })
        console.log("Ошибка авторизации!")
      })
  }

  //регистрация
  function handleRegister({ email, password }) {
    auth.register({ email, password })
      .then((res) => {
        if (!res.error)
          setIsInfoTooltipOpen(true)
        setInfoMessage({ isSuccess: true, message: "Вы успешно зарегистрировались!" })
        setLoggedIn(true)
        navigate("/", { replace: true });
        setEmail(email);
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true)
        setInfoMessage({ isSuccess: false, message: "Что-то пошло не так! Попробуйте ещё раз." })
        console.log("Ошибка регистрации")
      })
  }

  //сообщение при регистрации
  function handleShowInfoMessage(message) {
    setInfoMessage(message)
  }

  //проверка токена
  function handleTokenCheck() {
    if (localStorage.getItem("token")) {
      const jwt = localStorage.getItem("token");
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setEmail(res.data.email)
            setLoggedIn(true);
            navigate("/", { replace: true })
          }
        })
        .catch((err) => {
          console.log("Ошибка токена")
        })
    }
  }

  //выйти
  function handleLogOut() {
    setLoggedIn(false);
    setUserData({});
    localStorage.removeItem("token")
  }

  //открытие попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  //закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
    setIsInfoTooltipOpen(null)
  }

  //лайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    (isLiked ? api.doDislike(card._id) : api.doLike(card._id))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      })
      .catch((err) => console.log("не лайкнулась"));
  }

  //удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        const newCard = cards.filter((item) => item._id !== card._id);
        console.log(newCard)
        setCards(newCard);
      })
      .catch((err) => console.log("не удалилась"));
  }

  //редактирование данных профиля
  function handleUpdateUser(data) {
    api.updateUserData(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => console.log("пользователь не обновился"));
  }

  //редактирование аватара профиля
  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then(res => {
        console.log(res)
        setCurrentUser(res);
        closeAllPopups()
      })
      .catch((err) => console.log("аватар не обновился"));
  }

  //добавить новую карточку
  function handleAddPlace(data) {
    api.addNewCard(data)
      .then((data) => {
        const newCard = data
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log("карточка не добавлена"));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path="/signin" element={<Login onLogin={handleLogin} onShowInfoMessage={handleShowInfoMessage} />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} onShowInfoMessage={handleShowInfoMessage} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn}>
            <Header email={email} loggedIn={loggedIn} onLogOut={handleLogOut} />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onDeleteClick={handleCardDelete}
              cards={cards}
            />
          </ProtectedRoute>
          }
          />
        </Routes>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
        <ImagePopup card={selectedCard} onclose={closeAllPopups} />
        <InfoTooltip isOpen={isInfoTooltipOpen} message={infoMessage.message} isSuccess={infoMessage.isSuccess} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
