export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteCard, handleLikeButton) {
    this.name = data.name;
    this.link = data.link;
    this.alt = data.alt;
    this._id = data._id;
    this.isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeButton = handleLikeButton;
  }
  /* -------------------------------------------------------------------------- */
  /*                               Private Methods                              */
  /* -------------------------------------------------------------------------- */

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".elements__button");
    this._deleteButton = this._cardElement.querySelector(
      ".elements__button_delete"
    );

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton(this);
    });
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this); // pass the card as an argument (i.e., the this object)
    });
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({
        name: this.name,
        link: this.link,
      });
    });
  }

  /* ----------------------------- Button Handlers ---------------------------- */
  handleLikeIcon() {
    this._likeButton.classList.toggle("elements__button_active");
  }

  _handleRemoveCard() {
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
    this._cardImageEl = this._cardElement.querySelector(
      ".elements__card-image"
    );

    /* ---------------------------- Set Card Details ---------------------------- */
    this._cardTitle.textContent = this.name;
    this._cardImageEl.src = this.link;
    this._cardImageEl.alt = this.alt;
    /* ------------------------ Set Cards Event Listeners ----------------------- */
    this._setEventListeners();

    return this._cardElement;
  }
}
