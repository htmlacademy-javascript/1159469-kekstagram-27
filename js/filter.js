const filtersForm = document.querySelector('.img-filters__form');
const PHOTOS_FILTER_COUNT = 10;

export const setOnFilterClick = (data, cb) => {
  filtersForm.addEventListener('click', (evt) => {
    const allPhotos = document.querySelectorAll('.picture');
    allPhotos.forEach((item) => item.remove());
    if (evt.target.id === 'filter-discussed') {
      const photos = data.slice()
        .sort((a, b) => b.likes - a.likes);
      cb(photos);
    }

    if (evt.target.id === 'filter-default') {
      cb(data);
    }

    if (evt.target.id === 'filter-random') {
      const photos = data.slice().sort(() => Math.random() - 0.5).slice(0, PHOTOS_FILTER_COUNT);
      cb(photos);
    }
  });
};


