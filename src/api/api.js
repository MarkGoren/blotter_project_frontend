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

  static getFavorites(userInfo) {
    return fetch(`http://localhost:3000/favorites/getAll/${userInfo.id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static getFavPlaylists(userInfo) {
    return fetch(
      `http://localhost:3000/favorites/getPlaylists/${userInfo.id}`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async addToFav(info) {
    await fetch("http://localhost:3000/favorites/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async removeFromFav(info) {
    await fetch("http://localhost:3000/favorites/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static getLastReqDate(userInfo) {
    return fetch(
      `http://localhost:3000/promoRequests/lastReqDate/${userInfo.id}`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async newReq(reqInfo) {
    await fetch("http://localhost:3000/promoRequests/newReq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqInfo),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static async adminLogin(loginInfo) {
    await fetch("http://localhost:3000/admins/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginInfo),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static getAllRequests() {
    return fetch(`http://localhost:3000/promoRequests/getAll`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async processRequest(info) {
    await fetch("http://localhost:3000/promoRequests/processRequest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }

  static getAllUserPromoRequests(userInfo) {
    return fetch(
      `http://localhost:3000/userPromoPlaylists/getAll/${userInfo.id}`,
      {
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}
