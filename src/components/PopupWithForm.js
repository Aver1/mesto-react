function PopupWithForm (props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" name="popup-form" noValidate>
            {props.children}
            <button className="popup__save-btn" type="submit">{props.buttonText}</button>
          </form>
          <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
        </div>
      </section>
  );
};

export default PopupWithForm;