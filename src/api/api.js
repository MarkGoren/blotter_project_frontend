export default class Api {
  static getPlaylists() {
    return fetch(`http://localhost:3000/playlists/getAll`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static getByCategory(category) {
    return fetch(`http://localhost:3000/playlists/category/${category}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static getNewPlaylists() {
    return fetch(`http://localhost:3000/playlists/whatsNew`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}
