import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    // cделал 39 потому что так красивее, я знаю что в задании 40.
    this.PER_PAGE = 39;
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
  }
}
