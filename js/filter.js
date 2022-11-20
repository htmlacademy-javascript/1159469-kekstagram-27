
const filtersForm = document.querySelector('.img-filters__form');
const PHOTOS_FILTER_COUNT = 10;

export const setOnFilterClick = (data, cb) => {
  filtersForm.addEventListener('click', (evt) => {
    const allPhotos = document.querySelectorAll('.picture');
    allPhotos.forEach((item) => item.remove());
    let photos = data.slice();
    if (evt.target.id === 'filter-discussed') {
      photos = photos.sort((a, b) => b.comments.length - a.comments.length);
    }
    if (evt.target.id === 'filter-random') {
      photos = photos.sort(() => Math.random() - 0.5).slice(0, PHOTOS_FILTER_COUNT);
    }
    cb(photos);
  });
};
