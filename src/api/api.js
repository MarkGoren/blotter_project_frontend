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

  static async getFavorites(userInfo) {
    return fetch(`http://localhost:3000/favorites/getAll/${userInfo.id}`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  static async getFavPlaylists(userInfo) {
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

  static async getLastReqDate(userInfo) {
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

  static async getAllUserPromoRequests(userInfo) {
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

  static async userSubscribe(userInfo) {
    return fetch("http://localhost:3000/users/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
      credentials: "include",
    })
      .then((res) => res)
      .catch((err) => console.log(err));
  }
}
