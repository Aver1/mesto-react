import { useState } from 'react';
import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setAvatarState] = React.useState(false);
  const [isEditProfilePopupOpen, setProfileState] = React.useState(false);
  const [isAddPlacePopupOpen, setPlaceState] = React.useState(false);
  const [selectedCard, setCardState] = React.useState({});

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
  function closeAllPopups() {
    setAvatarState(false);
    setProfileState(false);
    setPlaceState(false);
    setCardState({});
  }

  return (
    <div>
      <Header />
      <Main 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick} 
        onCardClick={handleCardClick}>
        {/* Попап обновления аватара */}
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
          <input className="popup__input popup__input_type_avatar-link" id="avatar-name-input" type="url" minLength="2" placeholder="Ссылка" defaultValue="" name="popup-link" required/>
          <span className="popup__input-error avatar-name-input-error"></span>
        </PopupWithForm>
        {/* Попап удаления картинки */}
        <PopupWithForm name="card-delete-confirm" title="Вы уверены?" buttonText="Да"/>
        {/* Попап редактирования */}
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
          <input className="popup__input popup__input_type_name" id="edit-name-input" type="text" minLength="2" maxLength="40" placeholder="Имя" defaultValue="" name="popup-name" required/>
          <span className="popup__input-error edit-name-input-error"></span>
          <input className="popup__input popup__input_type_about" id="edit-about-input" type="text" minLength="2" maxLength="200" placeholder="О себе" defaultValue="" name="popup-about" required/>
          <span className="popup__input-error edit-about-input-error"></span>
        </PopupWithForm>
        {/* Попап добавления */}
        <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
          <input className="popup__input popup__input_type_card-name" id="add-name-input" type="text" minLength="2" maxLength="30" placeholder="Название" defaultValue="" name="popup-name" required/>
          <span className="popup__input-error add-name-input-error"></span>
          <input className="popup__input popup__input_type_card-link" id="add-link-input" type="url" placeholder="Ссылка на картинку" defaultValue="" name="popup-link" required/>
          <span className="popup__input-error add-link-input-error"></span>
        </PopupWithForm>
        {/* Попап просмотра картинки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </Main>
      <Footer />
    </div>
  );
}

export default App;
