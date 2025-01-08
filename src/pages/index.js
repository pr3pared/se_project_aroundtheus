/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Yosemite",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Lake Louise",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Bald Mountains",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Latemar",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Vanoise",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "Lago",
  },
];

/* -------------------------------------------------------------------------- */
/*                              Profile Selectors                             */
/* -------------------------------------------------------------------------- */
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
/* ---------------------------- Element Selectors --------------------------- */
const elementsList = document.querySelector(".elements__list");
/* ----------------------------- Popup Selectors ---------------------------- */
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
const popupFormProfileName = profileForm.querySelector(
  ".popup__input_type_name"
);
const popupFormProfileDescription = profileForm.querySelector(
  ".popup__input_type_description"
);
const popupCardFormPlace = cardForm.querySelector(".popup__input_type_place");
const popupCardFormImage = cardForm.querySelector(".popup__input_type_image");

/* -------------------------------------------------------------------------- */
/*                                  UserInfo                                  */
/* -------------------------------------------------------------------------- */
const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
});

/* -------------------------------------------------------------------------- */
/*                               Popup Handling                               */
/* -------------------------------------------------------------------------- */
const imagePopup = new PopupWithImage(".popup-photo");
imagePopup.setEventListeners();

const newCardPopup = new PopupWithForm(".popup-card", () => {
  const cardData = {
    name: popupCardFormPlace.value,
    link: popupCardFormImage.value,
    alt: popupCardFormPlace.value,
  };
  const card = new Card(cardData, "#card-template", (data) =>
    imagePopup.open(data)
  );
  const newCard = card.getTemplate();

  section.addItem(newCard, "prepend");
  newCardPopup.close();
  addFormValidator.resetForm();
  addFormValidator.disableSubmitButton();
});
newCardPopup.setEventListeners();
const newProfilePopup = new PopupWithForm(".popup-profile", (formValues) => {
  userInfo.setUserInfo({
    name: formValues["first-input"],
    description: formValues["second-input"],
  });
  newProfilePopup.close();
});
newProfilePopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                         Opening and Closing Popups Event Listeners                        */
/* -------------------------------------------------------------------------- */
editButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  popupFormProfileName.value = name;
  popupFormProfileDescription.value = description;
  newProfilePopup.open();
});
addButton.addEventListener("click", () => {
  newCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                        Creating New Cards in Card.js                       */
/* -------------------------------------------------------------------------- */

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData, method = "append") => {
      const addNewCard = new Card(cardData, "#card-template", (data) =>
        imagePopup.open(data)
      ).getTemplate();
      section.addItem(addNewCard, method);
    },
  },
  elementsList
);
section.renderItems();

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */
const formValidationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const addFormValidator = new FormValidator(formValidationConfig, cardForm);
addFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  formValidationConfig,
  profileForm
);
profileFormValidator.enableValidation();
