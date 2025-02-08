import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this.inputs = this._popupForm.querySelectorAll("input");
    this._submitButton = this._popupForm.querySelector('.popup__button');
    this._submitButtonText = "Save";
  }

  /* -------------------------------------------------------------------------- */
  /*                               Private Methods                               */
  /* -------------------------------------------------------------------------- */
  _getInputValues() {
    const inputObj = {};
    this.inputs.forEach((input) => {
      inputObj[input.name] = input.value;
    });
    return inputObj;
  }

  _submitForm(event) {
    event.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  /* -------------------------------------------------------------------------- */
  /*                               Public Methods                               */
  /* -------------------------------------------------------------------------- */

  renderLoading(isLoading, loadingText='Saving...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
	// here we return back the initial text. So, you don’t need to bother yourself about it
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  getForm() {
    return this._popupForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) =>
      this._submitForm(event)
    );
  }
}

export default PopupWithForm;
