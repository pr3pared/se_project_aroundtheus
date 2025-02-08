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
import { formValidationConfig } from "../utils/constants.js";
import "../pages/index.css";

/* -------------------------------------------------------------------------- */
/*                              Profile Selectors                             */
/* -------------------------------------------------------------------------- */
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const avatarButton = document.querySelector(".profile__avatar-button");
/* ---------------------------- Element Selectors --------------------------- */
const elementsList = document.querySelector(".elements__list");
/* ----------------------------- Popup Selectors ---------------------------- */
const profileForm = document.forms["profile-form"];
const popupFormProfileName = profileForm.querySelector(
  ".popup__input_type_name"
);
const popupFormProfileDescription = profileForm.querySelector(
  ".popup__input_type_description"
);

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
        card.handleRemoveCard();
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
        card.handleLikeIcon();
      })
      .catch((err) => {
        console.error(err);
      });
    } else {
      api.unlikeCard(card._id)
       .then(() => {
          card.isLiked = false;
          card.handleLikeIcon();
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
  newCardPopup.renderLoading(true);
  api
    .addCard(cardData)
    .then((cardData) => {
      const newCard = createCard(cardData);
      section.addItem(newCard, "prepend");
      newCardPopup.close();
      formValidators['card-form'].resetForm();
      formValidators['card-form'].disableSubmitButton();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.renderLoading(false);
    });
});
newCardPopup.setEventListeners();

const confirmationPopup = new PopupWithSubmit(".popup-confirm");
confirmationPopup.setEventListeners();

/* ------------------------------ Profile Popup ----------------------------- */
const newProfilePopup = new PopupWithForm(".popup-profile", (formValues) => {
  api.updateProfileInformation({
    name: formValues["first-input"],
    about: formValues["second-input"],
  })
  .then(() => {
    userInfo.setUserInfo({
      name: formValues["first-input"],
      description: formValues["second-input"],
    });
    newProfilePopup.close();
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    newProfilePopup.renderLoading(false);

  });
  newProfilePopup.renderLoading(true);
});
newProfilePopup.setEventListeners();

/* ------------------------------ Avatar Popup ------------------------------ */

const avatarPopup = new PopupWithForm(".popup-avatar", (formValues) => {
  avatarPopup.renderLoading(true);
  api
    .updateAvatar({
      avatar: formValues["first-input"],
    })
    .then((userData) => {
      avatarPopup.close();
      userInfo.setUserInfo({ avatar: userData.avatar });
      formValidators['avatar-form'].resetForm();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      avatarPopup.renderLoading(false);
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
  formValidators['profile-form'].resetValidation();
  newProfilePopup.open();
});
addButton.addEventListener("click", () => {
  newCardPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                                 Validation                                 */
/* -------------------------------------------------------------------------- */

const formValidators = {};

const enableValidation = (formValidationConfig) => {
  const formList = Array.from(document.querySelectorAll(formValidationConfig.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formValidationConfig, formElement)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formValidationConfig);
