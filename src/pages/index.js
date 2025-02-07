/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { formValidationConfig, initialCards } from "../utils/constants.js";
import "../pages/index.css";

/* -------------------------------------------------------------------------- */
/*                              Profile Selectors                             */
/* -------------------------------------------------------------------------- */
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const deleteButton = document.querySelectorAll(".elements__button_delete");
const avatarButton = document.querySelector(".profile__avatar-button");
/* ---------------------------- Element Selectors --------------------------- */
const elementsList = document.querySelector(".elements__list");
/* ----------------------------- Popup Selectors ---------------------------- */
const profileForm = document.forms["profile-form"];
const cardForm = document.forms["card-form"];
const avatarForm = document.forms["avatar-form"];
const popupFormProfileName = profileForm.querySelector(
  ".popup__input_type_name"
);
const popupFormProfileDescription = profileForm.querySelector(
  ".popup__input_type_description"
);
const popupButtonText = document.querySelector(".popup__button");
const popupCardFormPlace = cardForm.querySelector(".popup__input_type_place");
const popupCardFormImage = cardForm.querySelector(".popup__input_type_image");

/* -------------------------------------------------------------------------- */
/*                              API INITILIZATION                             */
/* -------------------------------------------------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8f859fc3-b526-4829-9aaa-ebed97a768c1",
    "Content-Type": "application/json",
  },
});

const section = new Section(
  {
    items: [],
    renderer: (cardData, method = "append") => {
      const addNewCard = createCard(cardData);
      section.addItem(addNewCard, method);
    },
  },
  elementsList
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards])=> {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
    section.setItems(initialCards);
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

/* -------------------------------------------------------------------------- */
/*                                  UserInfo                                  */
/* -------------------------------------------------------------------------- */

const userInfo = new UserInfo({
  profileNameSelector: ".profile__name",
  profileDescriptionSelector: ".profile__description",
  profileAvatarSelector: ".profile__avatar",
});

/* -------------------------------------------------------------------------- */
/*                               Popup Handling                               */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Image Popup ------------------------------ */
const imagePopup = new PopupWithImage(".popup-photo");
imagePopup.setEventListeners();

/* ------------------------------- Card Popup ------------------------------- */

function handleDeleteCard(card) {
  confirmationPopup.open(card);
  confirmationPopup.setSubmitAction(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        card._handleRemoveCard(this);
        confirmationPopup.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

function handleLikeButton(card) {
  if(!card.isLiked) {
    api.likeCard(card._id)
     .then(() => {
        card.isLiked = true;
        card._likeButton.classList.add("elements__button_active");
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      api.unlikeCard(card._id)
       .then(() => {
          card.isLiked = false;
          card._likeButton.classList.remove("elements__button_active");
        })
        .catch((err) => {
          console.error(err);
        });
      }
}

function createCard(item) {
  const card = new Card(
    item,
    "#card-template",
    (data) => imagePopup.open(data),
    handleDeleteCard, handleLikeButton
  );
  return card.getTemplate();
}

const newCardPopup = new PopupWithForm(".popup-card", (formValues) => {
  const cardData = {
    name: formValues["first-input"],
    link: formValues["second-input"],
    alt: formValues["first-input"],
  };
  const cardPopupButton = newCardPopup._submitButton;
  api
    .addCard(cardData)
    .then((cardData) => {
      const newCard = createCard(cardData);
      section.addItem(newCard, "prepend");
      newCardPopup.close();
      addFormValidator.resetForm();
      addFormValidator.disableSubmitButton();
      // card creation here
    })
    .catch((err) => {
      cardPopupButton.textContent = "ERROR";
      console.error(err);
    })
    .finally(() => {
      cardPopupButton.textContent = "Save";
    });
  cardPopupButton.textContent = "Saving...";
});
newCardPopup.setEventListeners();

const confirmationPopup = new PopupWithSubmit(".popup-confirm");

confirmationPopup.setEventListeners();

/* ------------------------------ Profile Popup ----------------------------- */
const newProfilePopup = new PopupWithForm(".popup-profile", (formValues) => {
  userInfo.setUserInfo({
    name: formValues["first-input"],
    description: formValues["second-input"],
  });
  api.updateProfileInformation({
    name: formValues["first-input"],
    about: formValues["second-input"],
  })
  .then(() => {
  })
  .catch((err) => {
    popupButtonText.textContent = "ERROR";
    console.error(err);
  })
  .finally(() => {
    newProfilePopup.close();
    popupButtonText.textContent = "Save";
  });
  popupButtonText.textContent = "Saving...";
});
newProfilePopup.setEventListeners();

/* ------------------------------ Avatar Popup ------------------------------ */

const avatarPopup = new PopupWithForm(".popup-avatar", (formValues) => {
  const avatarButtonText = avatarPopup._submitButton;
  avatarButtonText.textContent = "Saving...";
  api
    .updateAvatar({
      avatar: formValues["first-input"],
    })
    .then((userData) => {
      userInfo.setUserInfo({ avatar: userData.avatar });
    })
    .catch((err) => {
      avatarButtonText.textContent = "ERROR";
      console.error(err);
    })
    .finally(() => {
      avatarButtonText.textContent = "Save";
      avatarPopup.close();
    });
});

avatarButton.addEventListener("click", () => {
  avatarPopup.open();
});
avatarPopup.setEventListeners();

/* -------------------------------------------------------------------------- */
/*                         Opening and Closing Popups Event Listeners         */
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

// deleteButton.addEventListener("click", () => {
//   confirmationPopup.open();
// });

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

const addFormValidator = new FormValidator(formValidationConfig, cardForm);
addFormValidator.enableValidation();

const profileFormValidator = new FormValidator(
  formValidationConfig,
  profileForm
);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(formValidationConfig, avatarForm);
avatarFormValidator.enableValidation();
