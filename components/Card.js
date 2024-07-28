export default class Card {
    constructor(data, cardSelector, handleImageClick
    ){
        this._name = data.name;
        this._link = data.link;
        this._alt = data.alt;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        const likeButton = this._cardElement.querySelector(".elements__button");
        const deleteButton = this._cardElement.querySelector(".elements__button_delete");
        likeButton.addEventListener('click', () => {
            this._handleLikeIcon();
        })
        deleteButton.addEventListener('click', () => {
            this._handleDeleteCard();
        })
        
    }

    _handleLikeIcon() {
        likeButton.classList.toggle('elements__button_active');
    }

    _handleDeleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    getTemplate() {
        this._cardElement = document
        .querySelector(this._cardSelector)
        .content.querySelector(".elements__card")
        .cloneNode(true);

        //get template
        //set listeners
        this._setEventListeners()
        //return the card
    }
};