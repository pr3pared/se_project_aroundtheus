//enabling validation by calling enableValidation()
//pass all the settings on call

function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass)
}

function hideInputError() {

}

function checkInputValidity(formElement, inputElement, options) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
}

function setEventListeners(formElement, options) {
    const { inputSelector } = options;
    const inputElements = [...formElement.querySelectorAll(inputSelector)];

    inputElements.forEach(inputElement => {
        inputElement.addEventListener("input", (event) => {
            checkInputValidity(formElement, inputElement, options);
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