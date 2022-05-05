class MestoAuth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  };

  authentication (password, email) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({password, email})
    })
    .then(this._checkResponse)
  };

  authorization (password, email) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {"Content-Type": "application/json" },
      body: JSON.stringify({
        password, email
      })
    })
    .then(this._checkResponse)
  }

  getUser (token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponse)
  }
}

export const mestoAuth = new MestoAuth(
  'https://auth.nomoreparties.co'
); 