import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.PER_PAGE = 40;
    this.totalHits = 0;
    this.totalPages = 0;
  }

  async fetchGallery() {
    const axiosOptions = {
      method: 'get',
      url: 'https://pixabay.com/api/',
      params: {
        key: '34936731-737dc6cbc5148f9f58e69ebf4',
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${this.page}`,
        per_page: `${this.PER_PAGE}`,
      },
    };
    try {
      const response = await axios(axiosOptions);
      const data = response.data;
      this.totalHits = data.totalHits;
      this.totalPages = Math.ceil(data.totalHits / this.PER_PAGE);

      if (data.hits.length < this.PER_PAGE) {
        this.disableLoadMoreButton();
      }

      this.incrementPage();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  disableLoadMoreButton() {
    const loadMoreButton = document.querySelector('#load-more-button');
    if (loadMoreButton) {
      loadMoreButton.disabled = true;
    }
  }

  enableLoadMoreButton() {
    const loadMoreButton = document.querySelector('#load-more-button');
    if (loadMoreButton) {
      loadMoreButton.disabled = false;
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  resetEndOfHits() {
    this.endOfHits = false;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
    this.resetPage();
    this.resetEndOfHits();
  }

  shouldRenderLoadMoreButton() {
    return this.page < this.totalPages;
  }
}
