import React from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import Card from "./Card";

// function handleEditAvatarClick () {
//   document.querySelector('.popup_type_avatar').classList.add('popup_opened');
// }
// function handleEditProfileClick () {
//   document.querySelector('.popup_type_edit').classList.add('popup_opened');
// }
// function handleAddPlaceClick () {
//   document.querySelector('.popup_type_add').classList.add('popup_opened');
// }

function Main (props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, updateCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cardList]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);

        updateCards(cardList);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__group">
          <img className="profile__avatar" src={userAvatar} alt="Аватар профиля"/>
          <button className="profile__avatar-edit-btn" type="button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__about">{userDescription}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {
        cards.map((card) => (
            <Card onCardClick={props.onCardClick} key={card._id} card={card}/>
        ))
        }
      </section>
      {props.children}
      {/* Попап обновления аватара
      <PopupWithForm name="avatar" title="Обновить аватар">
        <input className="popup__input popup__input_type_avatar-link" id="avatar-name-input" type="url" minlength="2" placeholder="Ссылка" value="" name="popup-link" required/>
        <span className="popup__input-error avatar-name-input-error"></span>
      </PopupWithForm> */}
      {/* Попап удаления картинки */}
      {/* <PopupWithForm name="card-delete-confirm" title="Вы уверены?" /> */}
      {/* Попап редактирования */}
      {/* <PopupWithForm name="edit" title="Редактировать профиль">
        <input className="popup__input popup__input_type_name" id="edit-name-input" type="text" minlength="2" maxlength="40" placeholder="Имя" value="" name="popup-name" required/>
        <span className="popup__input-error edit-name-input-error"></span>
        <input className="popup__input popup__input_type_about" id="edit-about-input" type="text" minlength="2" maxlength="200" placeholder="О себе" value="" name="popup-about" required/>
        <span className="popup__input-error edit-about-input-error"></span>
      </PopupWithForm> */}
      {/* Попап добавления */}
      {/* <PopupWithForm name="add" title="Новое место">
        <input className="popup__input popup__input_type_card-name" id="add-name-input" type="text" minlength="2" maxlength="30" placeholder="Название" value="" name="popup-name" required/>
        <span className="popup__input-error add-name-input-error"></span>
        <input className="popup__input popup__input_type_card-link" id="add-link-input" type="url" placeholder="Ссылка на картинку" value="" name="popup-link" required/>
        <span className="popup__input-error add-link-input-error"></span>
      </PopupWithForm> */}
      {/* Попап просмотра картинки */}
      {/* <ImagePopup /> */}
    </main>
  );
}

export default Main;