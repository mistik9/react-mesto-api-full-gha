class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    register({ email, password }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                if (res.ok) return res.json();
            })

    }

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                if (res.ok) return res.json();
            })

    }
    checkToken(token) {
        return fetch(`${this._baseUrl}/users/me/`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => {
                if (res.ok) return res.json()
            })
    }
}

const auth = new Auth({
    baseUrl: 'http://localhost:3001',

});
export default auth;