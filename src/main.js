import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  smoothScroll,
} from './js/render-functions';
import iziToast from 'izitoast';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="query"]');
const loadMoreBtn = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

// 🔍 Пошук за запитом
async function onSearch(e) {
  e.preventDefault();

  currentQuery = input.value.trim();
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  if (!currentQuery) {
    iziToast.warning({
      title: 'Oops',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  try {
    showLoader();

    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    hideLoader();

    if (totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

// 🔁 Завантаження додаткових зображень
async function onLoadMore() {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);
    hideLoader();
    smoothScroll(); // ✅ плавне прокручування після підвантаження

    const totalLoaded = currentPage * perPage;

    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while loading more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
