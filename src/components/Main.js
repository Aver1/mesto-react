import React from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main (props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__group">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля"/>
          <button className="profile__avatar-edit-btn" type="button" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-btn" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__add-btn" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards">
        {
        props.cards.map((card) => (
            <Card onCardClick={props.onCardClick} key={card._id} card={card} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
        ))
        }
      </section>
      {props.children}
    </main>
  );
}

export default Main;