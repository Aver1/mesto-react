import React from "react";
import { api } from "../utils/Api";
import Card from "./Card";

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
    </main>
  );
}

export default Main;