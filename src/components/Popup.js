export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.remove("popup_hidden");
    document.addEventListener("click", this._handleClickClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.add("popup_hidden");
    document.removeEventListener("click", this._handleClickClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(event) {
    if (event.target.classList.contains("popup")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener("click", () => this.close());
  }
}
