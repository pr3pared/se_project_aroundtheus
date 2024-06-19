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
let addButton = document.querySelector(".profile__add-button");
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modal__close");
let modalForm = document.querySelector(".modal__form");
let modalButton = document.querySelector(".modal__button");



const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const elementsList = document.querySelector(".elements__list");

//New Submitted Names
const modalFormFirstInput = document.querySelector("[name = 'first-input']");
const modalFormSecondInput = document.querySelector("[name = 'second-input']");
const modalHeading = document.querySelector(".modal__heading");

function toggleProfileModal() {
  modal.classList.toggle("modal_hidden");
}

function openProfileModal() {
  modalFormFirstInput.value = profileName.innerText;
  modalFormSecondInput.value = profileDescription.innerText;
  modalHeading.textContent = "Edit Profile";
  modalButton.textContent = "Save";
  toggleProfileModal();
}

function openAddCardModal() {
  modalFormFirstInput.value = "";
  modalFormSecondInput.value = "";
  modalFormFirstInput.placeholder = 'Title';
  modalFormSecondInput.placeholder = "Image Link";
  modalHeading.textContent = "New Place";
  modalButton.textContent = "Create";
  toggleProfileModal();
}

function handleProfileFormSubmit(event) {
  profileName.textContent = modalFormFirstInput.value;
  profileDescription.textContent = modalFormSecondInput.value;
  toggleProfileModal();
}

function handleAddCardFormSubmit(event) {
  let newCard = {name: modalFormFirstInput.value, link: modalFormSecondInput.value, alt: modalFormFirstInput.value}
  console.log(newCard);
  initialCards.push(newCard);
  const newCardElement = createCard(newCard);
  elementsList.append(newCardElement);
  toggleProfileModal();
}

editButton.addEventListener("click", openProfileModal);
addButton.addEventListener("click", openAddCardModal);
modalClose.addEventListener("click", toggleProfileModal);
modalForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let modalButtonText = modalButton.textContent;
  console.log(modalButtonText);
  if (modalButtonText === "Create") {
      handleAddCardFormSubmit();
  } else if (modalButtonText === "Save") {
      handleProfileFormSubmit();
  } else {
    console.log("None");
  }
});

//Adding Cards
function createCard(cardData) {
  const cardTemplate = document.querySelector("#cards-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".elements__card-image").src = cardData.link;
  cardElement.querySelector(".elements__card-image").alt = cardData.alt;
  cardElement.querySelector(".elements__title").textContent = cardData.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const createCardElement = createCard(cardData);
  elementsList.append(createCardElement)
});
