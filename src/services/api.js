import axios from 'axios';

const BASE_URL = '/api';

export const getCharacters = async ({ pageParam = 1 }) => {
    const res = await axios.get(`${BASE_URL}/character?page=${pageParam}`);
    return res.data;
};

export const getCharacterById = async (id) => {
    const res = await axios.get(`${BASE_URL}/character/${id}`);
    return res.data;
};