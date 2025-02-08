import Popup from "./Popup.js";

class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupButton = this._popupElement.querySelector(".popup__button");
  }

  /* ----------------------------- Private Methods ---------------------------- */

  _submitForm(event) {
    event.preventDefault();
    this._handleFormSubmit();
  }

  /* ----------------------------- Public Methods ----------------------------- */

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener("click", (event) => {
      this._submitForm(event);
    });
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }
}

export default PopupWithSubmit;
