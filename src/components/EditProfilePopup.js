import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup (props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, changeName] = React.useState('');
  const [description, changeDescription] = React.useState('');

  React.useEffect(() => {
    changeName(currentUser.name);
    changeDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  function handleNameChange(e) {
    changeName(e.target.value);
  }

  function handleDescriptionChange(e) {
    changeDescription(e.target.value);
  }

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_name" id="edit-name-input" onChange={handleNameChange} type="text" minLength="2" maxLength="40" placeholder="Имя" value={ name || ''} name="popup-name" required/>
      <span className="popup__input-error edit-name-input-error"></span>
      <input className="popup__input popup__input_type_about" id="edit-about-input" onChange={handleDescriptionChange} type="text" minLength="2" maxLength="200" placeholder="О себе" value={description || ''} name="popup-about" required/>
      <span className="popup__input-error edit-about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;