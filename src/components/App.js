import { useState } from 'react';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import {api} from "../utils/Api"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isEditAvatarPopupOpen, setAvatarState] = React.useState(false);
  const [isEditProfilePopupOpen, setProfileState] = React.useState(false);
  const [isAddPlacePopupOpen, setPlaceState] = React.useState(false);
  const [selectedCard, setCardState] = React.useState({});

  // cards func

  const [cards, updateCards] = React.useState([]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        updateCards(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id)
      .then((newCard) => {
        updateCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
    }
    else {
      api.deleteLike(card._id)
      .then((newCard) => {
        updateCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
    }
  } 

  function handleCardDelete(card) {
    //Дополнительная проверка владельца
    const isOwn = card.owner._id == currentUser._id;
    
    if (isOwn) {
      api.deleteCard(card._id)
      .then((res) => {
        updateCards((state) => state.filter((c) => c._id !== card._id));
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  //------------------------------------

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getProfile().then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  function handleCardClick (card) {
    setCardState(card);
  }

  function handleEditAvatarClick () {
    setAvatarState(true);
  }
  function handleEditProfileClick () {
    setProfileState(true);
  }
  function handleAddPlaceClick () {
    setPlaceState(true);
  }
  function handleUpdateUser ({name, about}) {
    debugger;
    api.editProfile(name, about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }
  function handleUpdateAvatar ({avatar}) {
    api.updateAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name, link)
    .then((res) => {
      updateCards([res, ...cards]); 
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function closeAllPopups() {
    setAvatarState(false);
    setProfileState(false);
    setPlaceState(false);
    setCardState({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick} 
        onCardClick={handleCardClick}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}>
        {/* Попап обновления аватара */}
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        {/* Попап удаления картинки */}
        <PopupWithForm name="card-delete-confirm" title="Вы уверены?" buttonText="Да"/>
        {/* Попап редактирования */}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        {/* Попап добавления */}
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        {/* Попап просмотра картинки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </Main>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
