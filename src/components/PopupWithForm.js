import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this.inputs = this._popupForm.querySelectorAll("input");
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
    this._popupForm.reset();
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
}

export default PopupWithForm;
