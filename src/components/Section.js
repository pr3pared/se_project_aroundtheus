export default class Section {
  constructor({ items, renderer }, elementsList) {
    /* ---------- items: an array of data that you add when page loads ---------- */
    /* --- renderer: function that creates and adds a single item to the page --- */
    this._items = items;
    this._renderer = renderer;
    this._elementsList = elementsList;
  }

  renderItems() {
    /* ----- Iterate through the items array and call the renderer function ----- */
    this._items.forEach((cardData) => {
      this._renderer(cardData, "append");
    });
  }

  addItem(element, method = "appendChild") {
    /* ------------ Takes a DOM element and adds it to the container ------------ */
    if (this._elementsList[method]) {
      this._elementsList[method](element);
    }
  }
}
