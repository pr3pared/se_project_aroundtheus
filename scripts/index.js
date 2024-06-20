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
let modalPhoto = document.querySelector(".modal-photo");
let modalPhotoImage = modalPhoto.querySelector('.modal-photo__image');
let modalPhotoClose = modalPhoto.querySelector(".modal-photo__button");



const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const elementsList = document.querySelector(".elements__list");
const elementsCardPhoto = elementsList.querySelector(".elements__card-image");

//New Submitted Names
const modalFormFirstInput = document.querySelector("[name = 'first-input']");
const modalFormSecondInput = document.querySelector("[name = 'second-input']");
const modalHeading = document.querySelector(".modal__heading");

//Modal Handling

function toggleModal() {
  modal.classList.toggle("modal_hidden");
}

function togglePhotoModal() {
  modalPhoto.classList.toggle("modal_hidden");
}

function openProfileModal() {
  modalFormFirstInput.value = profileName.innerText;
  modalFormSecondInput.value = profileDescription.innerText;
  modalHeading.textContent = "Edit Profile";
  modalButton.textContent = "Save";
  toggleModal();
}

function openAddCardModal() {
  modalFormFirstInput.value = "";
  modalFormSecondInput.value = "";
  modalFormFirstInput.placeholder = 'Title';
  modalFormSecondInput.placeholder = "Image Link";
  modalHeading.textContent = "New Place";
  modalButton.textContent = "Create";
  toggleModal();
}

function openPhotoModal(cardData) {
  const modalPhoto = document.querySelector('.modal-photo');
  const modalPhotoImage = modalPhoto.querySelector('.modal-photo__image');
  const modalTitle = modalPhoto.querySelector(".modal-photo__title");

  modalPhotoImage.src = cardData.link;
  modalTitle.textContent = cardData.name;

  togglePhotoModal();
}

//Modal Form Submission Handling

function handleProfileFormSubmit(event) {
  profileName.textContent = modalFormFirstInput.value;
  profileDescription.textContent = modalFormSecondInput.value;
  toggleModal();
}

function handleAddCardFormSubmit(event) {
  let newCard = {name: modalFormFirstInput.value, link: modalFormSecondInput.value, alt: modalFormFirstInput.value}
  console.log(newCard);
  initialCards.push(newCard);
  const newCardElement = createCard(newCard);
  elementsList.append(newCardElement);
  toggleModal();
}

editButton.addEventListener("click", openProfileModal);
addButton.addEventListener("click", openAddCardModal);
modalClose.addEventListener("click", toggleModal);
modalPhotoClose.addEventListener("click", togglePhotoModal);

//Chosing Which Modal to Handle
modalForm.addEventListener('submit', function(event) {
  event.preventDefault();
  let modalButtonText = modalButton.textContent;
  //console.log(modalButtonText); Testing
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
  const likeButton = cardElement.querySelector(".elements__button");
  const card = cardElement.querySelector('.elements__card');
  const deleteButton = card.querySelector('.elements__button_delete');
  const cardPhoto = card.querySelector(".elements__card-image");
  
  cardElement.querySelector(".elements__card-image").src = cardData.link;
  cardElement.querySelector(".elements__card-image").alt = cardData.alt;
  cardElement.querySelector(".elements__title").textContent = cardData.name;
  //Like Button Listener
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__button_active');
  })
  //Delete Button Listener
  deleteButton.addEventListener('click', () => {
    card.remove();
  });

  cardPhoto.addEventListener('click', () => {
    openPhotoModal(cardData);
  });
  return cardElement;
}

initialCards.forEach((cardData) => {
  const createCardElement = createCard(cardData);
  elementsList.append(createCardElement)
});