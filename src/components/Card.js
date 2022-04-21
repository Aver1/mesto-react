import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    isOwn ? "card__delete" : "card__delete_type_hidden"
  ); 
  
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }
  
  return (
    <div className="card">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="card__container">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-group">
          <button className={`card__like ${isLiked ? "card__like_active" : ""}`}  type="button" onClick={handleLikeClick}></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;