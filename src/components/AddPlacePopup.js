import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup (props) {

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen])

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit (e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: title,
      link
    });
  }

  return (
    <PopupWithForm name="add" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
      <input className="popup__input popup__input_type_card-name" onChange={handleTitleChange} id="add-name-input" type="text" minLength="2" maxLength="30" placeholder="Название" value={title} name="popup-name" required/>
      <span className="popup__input-error add-name-input-error"></span>
      <input className="popup__input popup__input_type_card-link" onChange={handleLinkChange} id="add-link-input" type="url" placeholder="Ссылка на картинку" value={link} name="popup-link" required/>
      <span className="popup__input-error add-link-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;