import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  clearGallery();
  hideLoadMoreButton();

  query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  page = 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (!data.hits.length) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, no images found for your search.',
      });
      hideLoader();
      return;
    }

    createGallery(data.hits);
    if (data.hits.length < totalHits) showLoadMoreButton();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images.' });
  } finally {
    hideLoader();
    form.reset();
  }
}

async function onLoadMore() {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    smoothScroll();

    if (page * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Something went wrong.' });
  } finally {
    hideLoader();
  }
}

function smoothScroll() {
  const cardHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
