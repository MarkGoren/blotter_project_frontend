export default class Api {
  static async getPlaylists() {
    return fetch(`http://localhost:3000/playlists/getAll`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async getByCategory(category) {
    return fetch(`http://localhost:3000/playlists/category/${category}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async getNewPlaylists() {
    return fetch(`http://localhost:3000/playlists/whatsNew`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async registerUser(userInfo) {
    return fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async userExists(userInfo) {
    return fetch(`http://localhost:3000/users/exists/${userInfo.email}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async userLogin(loginInfo) {
    return fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async getFavorites() {
    return fetch(`http://localhost:3000/favorites/getAll`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async getFavPlaylists() {
    return fetch(`http://localhost:3000/favorites/getPlaylists`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async addToFav(info) {
    return fetch("http://localhost:3000/favorites/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async removeFromFav(info) {
    return fetch("http://localhost:3000/favorites/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async getLastReqDate() {
    return fetch(`http://localhost:3000/promoRequests/lastReqDate`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async newReq(reqInfo) {
    return fetch("http://localhost:3000/promoRequests/newReq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqInfo),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async adminLogin(loginInfo) {
    return fetch("http://localhost:3000/admins/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async getAllRequests() {
    return fetch(`http://localhost:3000/promoRequests/getAll`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async processRequest(info) {
    return fetch("http://localhost:3000/promoRequests/processRequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async getAllUserPromoRequests() {
    return fetch(`http://localhost:3000/userPromoPlaylists/getAll`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async userSubscribe() {
    return fetch("http://localhost:3000/users/subscribe", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async sendEmail(emailData) {
    return fetch("http://localhost:3000/mail/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(emailData),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async sendResetPasswordEmail(email) {
    return fetch("http://localhost:3000/users/sendResetPasswordEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async changePassword(password) {
    return fetch("http://localhost:3000/users/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(password),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async getAllGenres() {
    return fetch(`http://localhost:3000/playlists/getAllGenres`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async deletePlaylistById(playlistId) {
    return fetch(
      `http://localhost:3000/playlists/deletePlaylist/${playlistId}`,
      {
        credentials: "include",
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }

  static async addPlaylist(info) {
    return fetch("http://localhost:3000/playlists/addPlaylist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }
}
