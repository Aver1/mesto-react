function ImagePopup (props) {
  return (
    <section className={`popup popup_type_image ${props.card.name !== undefined ? 'popup_opened' : ''}`}>
      <figure className="popup__image-container">
        <img className="popup__card-image" src={props.card.link  ? props.card.link : '#'} alt={props.card.name}/>
        <figcaption className="popup__image-caption">{props.card.name}</figcaption>
        <button className="popup__close-btn" type="button" onClick={props.onClose}></button>
      </figure>
    </section>
  );
}

export default ImagePopup;