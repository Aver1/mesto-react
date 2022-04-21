import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup (props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: inputRef.current.value 
    });
  } 
  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_avatar-link" ref={inputRef} id="avatar-name-input" type="url" minLength="2" placeholder="Ссылка" defaultValue="" name="popup-link" required/>
      <span className="popup__input-error avatar-name-input-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;