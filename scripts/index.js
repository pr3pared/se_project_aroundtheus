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

//Profile Modal Handler

let editButton = document.querySelector(".profile__edit-button");
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modal__close");
let modalForm = document.querySelector(".modal__form");


const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const elementsList = document.querySelector(".elements__list");

//New Submitted Names
const modalFormName = document.querySelector("[name = 'profile-name']");
const modalFormDescription = document.querySelector("[name = 'profile-description']");

function toggleProfileModal() {
  modal.classList.toggle("modal_hidden");
}

function openProfileModal() {
  modalFormName.value = profileName.innerText;
  modalFormDescription.value = profileDescription.innerText;
  toggleProfileModal();
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = modalFormName.value;
  profileDescription.textContent = modalFormDescription.value;
  toggleProfileModal();
}

editButton.addEventListener("click", openProfileModal);
modalClose.addEventListener("click", toggleProfileModal);
modalForm.addEventListener("submit", handleProfileFormSubmit);

//Adding Cards
function createCard(cardData) {
  const cardTemplate = document.querySelector("#cards-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".elements__card-image").src = cardData.link;
  cardElement.querySelector(".elements__card-image").alt = cardData.alt;
  cardElement.querySelector(".elements__title").textContent = cardData.name;
  //console.log(cardData);
  console.log(cardElement);
  return cardElement;
}

initialCards.forEach((cardData) => {
  const createCardElement = createCard(cardData);
  elementsList.append(createCardElement)
});


//LATER FUNCTIONALITY ADD BUTTON
// const addButton = querySelector(".profile__add-button");
// addButton.addEventListener()
