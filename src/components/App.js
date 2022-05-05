import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from './EditProfilePopup';
import {api} from "../utils/Api"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Switch, Route, Link, Redirect, useHistory} from 'react-router-dom'
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import { mestoAuth } from '../utils/MestoAuth'
import InfoTooltip from './InfoTooltip';


function App() {
  const [isEditAvatarPopupOpen, setAvatarState] = React.useState(false);
  const [isEditProfilePopupOpen, setProfileState] = React.useState(false);
  const [isAddPlacePopupOpen, setPlaceState] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipState] = React.useState(false);
  const [selectedCard, setCardState] = React.useState({});
  const [userEmail, setUserEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [authStatus, setAuthStatus] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  // cards func

  const [cards, updateCards] = React.useState([]);

  React.useEffect(() => {
    tokenCheck();
    api.getInitialCards()
      .then((res) => {
        updateCards(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id)
      .then((newCard) => {
        updateCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
    }
    else {
      api.deleteLike(card._id)
      .then((newCard) => {
        updateCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err);
      });
    }
  } 

  function handleCardDelete(card) {
    //Дополнительная проверка владельца
    const isOwn = card.owner._id == currentUser._id;
    
    if (isOwn) {
      api.deleteCard(card._id)
      .then((res) => {
        updateCards((state) => state.filter((c) => c._id !== card._id));
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  //------------------------------------

  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    api.getProfile().then((res) => {
      setCurrentUser(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
        history.push("/");
        return;
    }

    history.push('/sign-in');
  }, [loggedIn]);

  function handleCardClick (card) {
    setCardState(card);
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
  function handleUpdateUser ({name, about}) {
    api.editProfile(name, about)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }
  function handleUpdateAvatar ({avatar}) {
    api.updateAvatar(avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit({name, link}) {
    api.addCard(name, link)
    .then((res) => {
      updateCards([res, ...cards]); 
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function closeAllPopups() {
    setAvatarState(false);
    setProfileState(false);
    setPlaceState(false);
    setInfoTooltipState(false)
    setCardState({});
  }

  const handleRegister = (password, email) => {
    return mestoAuth
      .authentication(password, email)
      .then(() => {
        setMessage('Вы успешно зарегистрировались!');
        setAuthStatus(true);
        setInfoTooltipState(true);
        setTimeout(() => {history.push('/sign-in'); setInfoTooltipState(false)}, 2000);
      })
      .catch(() => {
        setAuthStatus(false);
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipState(true);
      });
  }

  const handleLogin = (email, password) => {
    return mestoAuth
      .authorization(password, email)
      .then((data) => {
        if (!data.token) {
          return;
          }
        localStorage.setItem('jwt', data.token);
        console.log(localStorage.getItem('jwt'));
        
        setUserEmail(email)
        setLoggedIn(true);
        })
      .catch (() => {
        setAuthStatus(false);
        setMessage('Что-то пошло не так! Попробуйте ещё раз.');
        setInfoTooltipState(true);
      })
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
}

  const tokenCheck = () => {
    if (localStorage.getItem('jwt')){
        let jwt = localStorage.getItem('jwt');
        mestoAuth.getUser(jwt).then((res) => {
            if (res){
              setUserEmail(res.data.email);
              setLoggedIn(true);
            }
        });
    }
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
          <Header>
            <div className="header__container">
              <p className="header__email">{userEmail}</p>
              <Link to="/sign-in" className="header__link" onClick={handleSignOut}>Выйти</Link>
            </div>
          </Header>
          <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick} 
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}>
            {/* Попап обновления аватара */}
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
            {/* Попап удаления картинки */}
            <PopupWithForm name="card-delete-confirm" title="Вы уверены?" buttonText="Да"/>
            {/* Попап редактирования */}
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
            {/* Попап добавления */}
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
            {/* Попап просмотра картинки */}
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          </Main>
          <Footer />
        </ProtectedRoute>
        {/* </Route> */}
        <Route path="/sign-up">
          <Header>
            <Link to="/sign-in" className="header__link">Войти</Link>
          </Header>
          <Register handleRegister={handleRegister} />
          <InfoTooltip 
            isOpen={isInfoTooltipOpen}
            title={message}
            onClose={closeAllPopups}
            isOk={authStatus}
          />
        </Route>
        <Route path="/sign-in">
          <Header>
            <Link to="/sign-up" className="header__link">Регистрация</Link>
          </Header>
          <Login handleLogin={handleLogin}/>
          <InfoTooltip 
            isOpen={isInfoTooltipOpen}
            title={message}
            onClose={closeAllPopups}
            isOk={authStatus}
          />
        </Route>
        <Route>
          {loggedIn ? <Redirect exact to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
