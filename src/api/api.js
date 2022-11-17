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

  static async registerUser(userInfo) {
    await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static userExists(userInfo) {
    return fetch(`http://localhost:3000/users/exists/${userInfo.email}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async userLogin(loginInfo) {
    await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }
}
