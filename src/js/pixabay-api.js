import axios from 'axios';

const API_KEY = '52827069-8d460a0c946a5f422e59aa590';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.error('Помилка запиту:', error);
      throw error;
    });
}
