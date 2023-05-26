class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;


    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

    }

    updateUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

    }

    updateAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);

            })

    }

    doLike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'PUT',
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();

                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

    }

    doDislike(_id) {
        return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
            method: 'DELETE',
            credentials: 'include',
         })
            .then(res => {
            if (res.ok) {
    return res.json();
}
return Promise.reject(`Ошибка: ${res.status}`);
            })

    }

deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: 'DELETE',
        credentials: 'include',
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
}

}




const api = new Api({
    baseUrl: [
       'https://api.mistik9mesto.nomoredomains.monster',
        // 'http://localhost:3001',
    ],
    headers: {
        'Content-Type': 'application/json'
    }
});
export default api;