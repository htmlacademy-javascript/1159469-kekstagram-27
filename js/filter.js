export const sortRandomPhotos = (data) => data.slice().sort(() => Math.random() - 0.5).slice(0, 10);
export const sortDiscussedPhotos = (data) => data.slice().sort((a, b) => b.comments.length - a.comments.length);
export const sortDefaultPhotos = (data) => data.slice();

export const setOnFilterClick = (cb, filterName) => {
  const filterButton = document.querySelector(`#filter-${filterName}`);
  filterButton.addEventListener('click', () => {
    const currentFilterButton = document.querySelector('.img-filters__button--active');
    currentFilterButton.classList.remove('img-filters__button--active');
    filterButton.classList.add('img-filters__button--active');
    cb();
  });
};
