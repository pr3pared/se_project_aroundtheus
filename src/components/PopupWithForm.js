import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    console.log(popupSelector);
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Private Methods                               */
  /* -------------------------------------------------------------------------- */
  _getInputValues() {
    const inputs = this._popupForm.querySelectorAll("input");
    const inputObj = {};
    inputs.forEach((input) => {
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

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (event) =>
      this._submitForm(event)
    );
  }

  close() {
    console.log("close triggered");
    this._popupForm.reset();
    super.close();
  }
}

export default PopupWithForm;
