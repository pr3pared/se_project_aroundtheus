/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
/* ---------------------------- Element Selectors --------------------------- */
const elementsList = document.querySelector(".elements__list");
/* ----------------------------- Popup Selectors ---------------------------- */
const popups = document.querySelectorAll(".popup");
const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");
const popupProfileClose = popupProfile.querySelector(".popup__close");
const popupCardClose = popupCard.querySelector(".popup__close");
const popupFormProfile = document.querySelector(".popup__form_profile");
const popupFormCard = document.querySelector(".popup__form_card");
const popupPhoto = document.querySelector(".popup-photo");
const popupPhotoImage = popupPhoto.querySelector(".popup-photo__image");
const popupPhotoClose = popupPhoto.querySelector(".popup-photo__button");
const cardFormButton = popupFormCard.querySelector(".popup_button");
const popupFormProfileName = popupFormProfile.querySelector(
  ".popup__input_type_name"
);
const popupFormProfileDescription = popupFormProfile.querySelector(
  ".popup__input_type_description"
);
const popupCardFormPlace = popupFormCard.querySelector(
  ".popup__input_type_place"
);
const popupCardFormImage = popupFormCard.querySelector(
  ".popup__input_type_image"
);
const popupTitle = popupPhoto.querySelector(".popup-photo__title");

/* -------------------------------------------------------------------------- */
/*                               Popup Handling                               */
/* -------------------------------------------------------------------------- */

function openPopup(popup) {
  popup.classList.remove("popup_hidden");
  document.addEventListener("keydown", handleEscListener);
  document.addEventListener("click", handleClickListener);
}

function closePopup(popup) {
  popup.classList.add("popup_hidden");
  document.removeEventListener("keydown", handleEscListener);
  document.removeEventListener("click", handleClickListener);
}

function handleEscListener(event) {
  if (event.key === "Escape") {
    popups.forEach((popup) => {
      if (!popup.classList.contains("popup_hidden")) {
        closePopup(popup);
      }
    });
  }
}

function handleClickListener(event) {
  const clickedElement = event.target;
  if (event.target.classList.contains("popup")) {
    closePopup(clickedElement);
  }
}

function openProfilePopup() {
  popupFormProfileName.value = profileName.textContent;
  popupFormProfileDescription.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function openAddCardPopup() {
  openPopup(popupCard);
}

function openPhotoPopup(cardData) {
  popupPhotoImage.src = cardData.link;
  popupTitle.textContent = cardData.name;
  popupPhotoImage.alt = cardData.alt;
  openPopup(popupPhoto);
}

/* -------------------------------------------------------------------------- */
/*                       Popup Form Submission Handling                       */
/* -------------------------------------------------------------------------- */

function handleProfileFormSubmit(event) {
  profileName.textContent = popupFormProfileName.value;
  profileDescription.textContent = popupFormProfileDescription.value;

  closePopup(popupProfile);
}

function handleAddCardFormSubmit(event) {
  const newCard = {
    name: popupCardFormPlace.value,
    link: popupCardFormImage.value,
    alt: popupCardFormPlace.value,
  };
  const newCardElement = new Card(newCard, "#card-template", openPhotoPopup);
  elementsList.prepend(newCardElement.getTemplate());
  closePopup(popupCard);
  addFormValidator.resetForm();
  addFormValidator.disableSubmitButton();
}

/* -------------------------------------------------------------------------- */
/*                         Opening and Closing Popups                         */
/* -------------------------------------------------------------------------- */
editButton.addEventListener("click", openProfilePopup);
addButton.addEventListener("click", openAddCardPopup);
popupProfileClose.addEventListener("click", () => {
  closePopup(popupProfile);
});
popupCardClose.addEventListener("click", () => {
  closePopup(popupCard);
});
popupPhotoClose.addEventListener("click", () => {
  closePopup(popupPhoto);
});

/* -------------------------------------------------------------------------- */
/*                          Form Submission Handlers                          */
/* -------------------------------------------------------------------------- */
popupFormProfile.addEventListener("submit", function (event) {
  event.preventDefault();
  handleProfileFormSubmit();
});

popupFormCard.addEventListener("submit", function (event) {
  event.preventDefault();
  handleAddCardFormSubmit();
});

/* -------------------------------------------------------------------------- */
/*                        Creating New Cards in Card.js                       */
/* -------------------------------------------------------------------------- */
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", openPhotoPopup); //openPhotoPopup()
  elementsList.append(card.getTemplate());
});

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

const addFormValidator = new FormValidator(formValidationConfig, popupFormCard);
addFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  formValidationConfig,
  popupFormProfile
);
profileFormValidator.enableValidation();
