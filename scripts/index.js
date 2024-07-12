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

//Profile Selectors
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
//Element Selectors
const elementsList = document.querySelector(".elements__list");
const elementsCardPhoto = elementsList.querySelector(".elements__card-image");
//Popup Selectors
const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");
const popupProfileClose = popupProfile.querySelector(".popup__close");
const popupCardClose = popupCard.querySelector(".popup__close");
const popupFormProfile = document.querySelector(".popup__form_profile");
const popupFormCard = document.querySelector(".popup__form_card");
const popupButton = document.querySelector(".popup__button");
const popupPhoto = document.querySelector(".popup-photo");
const popupPhotoImage = popupPhoto.querySelector('.popup-photo__image');
const popupPhotoClose = popupPhoto.querySelector(".popup-photo__button");
const popupFormProfileName = popupFormProfile.querySelector(".popup__input_type_name");
const popupFormProfileDescription = popupFormProfile.querySelector(".popup__input_type_description");
const popupCardFormPlace = popupFormCard.querySelector(".popup__input_type_place");
const popupCardFormImage = popupFormCard.querySelector(".popup__input_type_image");

//Popup Handling

function openPopup(popup) {
  popup.classList.remove("popup_hidden");
}

function closePopup(popup) {
  popup.classList.add("popup_hidden");
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
  const popupPhoto = document.querySelector('.popup-photo');
  const popupPhotoImage = popupPhoto.querySelector('.popup-photo__image');
  const popupTitle = popupPhoto.querySelector(".popup-photo__title");

  popupPhotoImage.src = cardData.link;
  popupTitle.textContent = cardData.name;
  popupPhotoImage.alt = cardData.alt;
  openPopup(popupPhoto);
}

//Popup Form Submission Handling

function handleProfileFormSubmit(event) {
  profileName.textContent = popupFormProfileName.value;
  profileDescription.textContent = popupFormProfileDescription.value;
  closePopup(popupProfile);
}

function handleAddCardFormSubmit(event) {
  const newCard = {name: popupCardFormPlace.value, link: popupCardFormImage.value, alt: popupCardFormPlace.value}
  const newCardElement = createCard(newCard);
  
  elementsList.prepend(newCardElement);
  closePopup(popupCard);
  //Couldn't get the event target to work
  popupCardFormPlace.value = ("");
  popupCardFormImage.value = ("");
}

//Opening and Closing Popups
editButton.addEventListener("click", openProfilePopup);
addButton.addEventListener("click", openAddCardPopup);
popupProfileClose.addEventListener("click",()=> { 
  closePopup(popupProfile);
})
popupCardClose.addEventListener("click",()=> { 
  closePopup(popupCard);
})
popupPhotoClose.addEventListener("click",()=> { 
  closePopup(popupPhoto);
})

//Form Submission Handlers
popupFormProfile.addEventListener('submit', function(event) {
  event.preventDefault();
  handleProfileFormSubmit();
});

popupFormCard.addEventListener('submit', function(event) {
  event.preventDefault();
  handleAddCardFormSubmit();
});

//Adding Cards
function createCard(cardData) {
  console.log(cardData);
  const cardTemplate = document.querySelector("#cards-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".elements__button");
  const card = cardElement.querySelector('.elements__card');
  const deleteButton = card.querySelector('.elements__button_delete');
  const cardPhoto = card.querySelector(".elements__card-image");
  const cardTitle = card.querySelector(".elements__title");

  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.alt;
  cardTitle.textContent = cardData.name;
  //Like Button Listener
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__button_active');
  })
  //Delete Button Listener
  deleteButton.addEventListener('click', () => {
    card.remove();
  });

document.addEventListener("keydown", function (event) {
  const popup = document.querySelectorAll(".popup");
  if(event.key === "Escape") {
    popup.forEach((popups) => {
      if (!popups.classList.contains("popup_hidden")) {
        closePopup(popups);
      }
    });
  };
});

document.addEventListener('click', function(event) {
  const clickedElement = event.target;
  if (event.target.classList.contains("popup")) {
      closePopup(clickedElement);
  }
});

cardPhoto.addEventListener('click', () => {
  openPhotoPopup(cardData);
  });
  return cardElement;
}

initialCards.forEach((cardData) => {
  const createCardElement = createCard(cardData);
  elementsList.append(createCardElement)
});