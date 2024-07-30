export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this.name = data.name;
    this.link = data.link;
    this.alt = data.alt;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  /* -------------------------------------------------------------------------- */
  /*                               Private Methods                              */
  /* -------------------------------------------------------------------------- */

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".elements__button");
    this._deleteButton = this._cardElement.querySelector(
      ".elements__button_delete"
    );
    this._cardImageElement = this._cardElement.querySelector(
      ".elements__card-image"
    );

    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  /* ----------------------------- Button Handlers ---------------------------- */
  _handleLikeIcon() {
    this._likeButton.classList.toggle("elements__button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  /* -------------------------------------------------------------------------- */
  /*                               Public Methods                               */
  /* -------------------------------------------------------------------------- */

  getTemplate() {
    /* ------------------------------ Get Template ------------------------------ */
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
    this._cardTitle = this._cardElement.querySelector(".elements__title");
    this._cardPhoto = this._cardElement.querySelector(".elements__card-image");
    this._cardTitle = this._cardElement.querySelector(".elements__title");

    /* ---------------------------- Set Card Details ---------------------------- */
    this._cardTitle.textContent = this.name;
    this._cardPhoto.src = this.link;
    this._cardPhoto.alt = this.alt;
    /* ------------------------ Set Cards Event Listeners ----------------------- */
    this._setEventListeners();

    return this._cardElement;
  }
}
