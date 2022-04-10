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
  const [selectedCard, setCardState] = React.useState([]);

  function handleCardClick (card) {
    setCardState(...selectedCard, card);
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
    setCardState([]);
  }

  return (
    <div>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}>
        {/* Попап обновления аватара */}
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input className="popup__input popup__input_type_avatar-link" id="avatar-name-input" type="url" minLength="2" placeholder="Ссылка" defaultValue="" name="popup-link" required/>
          <span className="popup__input-error avatar-name-input-error"></span>
        </PopupWithForm>
        {/* Попап удаления картинки */}
        <PopupWithForm name="card-delete-confirm" title="Вы уверены?" />
        {/* Попап редактирования */}
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input className="popup__input popup__input_type_name" id="edit-name-input" type="text" minLength="2" maxLength="40" placeholder="Имя" defaultValue="" name="popup-name" required/>
          <span className="popup__input-error edit-name-input-error"></span>
          <input className="popup__input popup__input_type_about" id="edit-about-input" type="text" minLength="2" maxLength="200" placeholder="О себе" defaultValue="" name="popup-about" required/>
          <span className="popup__input-error edit-about-input-error"></span>
        </PopupWithForm>
        {/* Попап добавления */}
        <PopupWithForm name="add" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input className="popup__input popup__input_type_card-name" id="add-name-input" type="text" minLength="2" maxLength="30" placeholder="Название" defaultValue="" name="popup-name" required/>
          <span className="popup__input-error add-name-input-error"></span>
          <input className="popup__input popup__input_type_card-link" id="add-link-input" type="url" placeholder="Ссылка на картинку" defaultValue="" name="popup-link" required/>
          <span className="popup__input-error add-link-input-error"></span>
        </PopupWithForm>
        {/* Попап просмотра картинки */}
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </Main>
      <Footer />
      <template id="card-template">
        <div className="card">
          <button className="card__delete"></button>
          <img className="card__image" src="#" alt="#"/>
          <div className="card__container">
            <h2 className="card__title"></h2>
            <div className="card__like-group">
              <button className="card__like" type="button"></button>
              <span className="card__like-count">5</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  );
}

export default App;
