//enabling validation by calling enableValidation()
//pass all the settings on call

function showInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {
        return (showInputError(formElement, inputElement, options));
    } 
    hideInputError(formElement, inputElement, options);
    
}

function hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
}

//Disable button
function disableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
}

//enable button
function enableButton(submitButton, inactiveButtonClass) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

function toggleButtonState(inputElements, submitButton, { inactiveButtonClass }) {
    if(hasInvalidInput(inputElements)) {
        disableButton(submitButton, inactiveButtonClass);
        return
    } 
    enableButton(submitButton, inactiveButtonClass);
}

function setEventListeners(formElement, options) {
    const { inputSelector } = options;
    const inputElements = [...formElement.querySelectorAll(inputSelector)];
    const submitButton = formElement.querySelector(".popup__button");

    inputElements.forEach(inputElement => {
        inputElement.addEventListener("input", (event) => {
            checkInputValidity(formElement, inputElement, options);
            toggleButtonState(inputElements, submitButton, options);
        });
    })
}

function enableValidation(options) {
    const formElements = [...document.querySelectorAll(options.formSelector)];
    formElements.forEach((formElement) => {
        formElement.addEventListener("submit", (element) => {
            element.preventDefault();
        });

    setEventListeners(formElement, options);

        //Find all inputs in the forms
        //Loop through the inputs and see if valid
            //if an input is not valid then 
                //grab validation message 
                //add error class to input
                //show error message
                // button is disabled
            //if all input valid
                //enable button
                //reset error messages
    })
}

const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };



enableValidation(config);