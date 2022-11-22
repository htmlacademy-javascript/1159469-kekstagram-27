const picturesContainer = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarFragment = document.createDocumentFragment();

export const renderPhotos = (similarPhotos, cb) => {
  const allUsersPhotos = document.querySelectorAll('.picture');
  allUsersPhotos.forEach((item) => item.remove());
  const filteredPhotos = cb(similarPhotos);
  filteredPhotos.forEach(({ url, comments, likes, id }) => {
    const photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.id = id;
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    similarFragment.append(photoElement);
  });
  picturesContainer.append(similarFragment);
};
