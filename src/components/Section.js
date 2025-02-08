export default class Section {
  constructor({ items, renderer }, elementsList) {
    this._items = items;
    this._renderer = renderer;
    this._elementsList = elementsList;
  }
  /* -------------------------------------------------------------------------- */
  /*                               Public Methods                               */
  /* -------------------------------------------------------------------------- */

  setItems(items) {
    this._items = items;
  }

  renderItems() {
    this._items.forEach((cardData) => {
      this._renderer(cardData, "append");
    });
  }

  addItem(element, method = "appendChild") {
    if (this._elementsList[method]) {
      this._elementsList[method](element);
    }
  }
}
