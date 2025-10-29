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

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
let currentQuery = '';
let currentPage = 1;
const PER_PAGE = 15;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'No images found. Please try another query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    // Якщо всі результати вмістились на першій сторінці
    if (data.totalHits <= PER_PAGE) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    // Очистити поле пошуку
    event.target.reset();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong while fetching images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  hideLoadMoreButton();
  showLoader();

  try {
    currentPage += 1;
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    const totalLoaded = currentPage * PER_PAGE;

    if (totalLoaded >= data.totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
