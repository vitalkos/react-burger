export const BASE_URL = 'https://norma.nomoreparties.space';

const checkResponse = (res) =>
    res?.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

const checkSuccess = (payload) =>
    payload?.success ? payload : Promise.reject(`Ответ не success: ${payload}`);

export const request = (endpoint, options) =>
    fetch(`${BASE_URL}/api/${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess);