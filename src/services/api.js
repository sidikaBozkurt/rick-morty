// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = async () => {
    const res = await axios.get(`${BASE_URL}/character`);
    return res.data;  // { info: {...}, results: [...] }
};

export const getCharacterById = async (id) => {
    const res = await axios.get(`${BASE_URL}/character/${id}`);
    return res.data;  // tek bir karakter objesi
};
