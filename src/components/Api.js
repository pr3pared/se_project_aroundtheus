export default class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    // ...
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4a3de98b-5ff4-4d58-8a64-8fc9fff3cea7",
    "Content-Type": "application/json",
  },
});
