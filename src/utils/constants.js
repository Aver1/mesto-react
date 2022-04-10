export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_type_disabled',
  inputErrorClass: 'popup__input_type_error',
}

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

export const popupCardImage = document.querySelector('.popup_type_image');
export const popupImage = document.querySelector('.popup__card-image');
export const popupImageCaption = document.querySelector('.popup__image-caption');
export const cards = document.querySelector('.cards');
export const profileAvatar = document.querySelector('.profile__avatar')

// Popups
export const popupEditProfile = document.querySelector('.popup_type_edit');
export const popupAddCard = document.querySelector('.popup_type_add');
export const popupEditAvatar = document.querySelector('.popup_type_avatar');

// Buttons
export const popupEditButton = document.querySelector('.profile__edit-btn');
export const popupAddCardButton = document.querySelector('.profile__add-btn');
export const popupEditAvatarButton = document.querySelector('.profile__avatar-edit-btn');
// Forms
export const editForm = popupEditProfile.querySelector('.popup__form');
export const popupName = document.querySelector('.popup__input_type_name');
export const popupAbout = document.querySelector('.popup__input_type_about');
export const addForm = popupAddCard.querySelector('.popup__form');
export const AvatarForm = popupEditAvatar.querySelector('.popup__form');