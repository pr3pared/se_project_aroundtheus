const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    },
]

let editButton = document.querySelector(".profile__edit-button");
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".modal__close");
let modalForm = document.querySelector(".modal__form")

editButton.addEventListener("click", function(){
    modal.classList.remove("modal_hidden");
})

modalClose.addEventListener("click", function(){
    modal.classList.add("modal_hidden");
})

//Shows on site
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

//New Submitted Names
const submittedName = document.querySelector(".modal__form-name");
const submittedTitle = document.querySelector(".modal__form-title");

modalForm.addEventListener("submit", modalFormSubmit);


function modalFormSubmit(event) {
    event.preventDefault();
    profileName.textContent = submittedName.value;
    profileTitle.textContent = submittedTitle.value;
    modal.classList.add("modal_hidden");
}