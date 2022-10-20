import {createPhotos} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const similarPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPhotos = createPhotos();

const similarFragment = document.createDocumentFragment();

const renderOtherUsersPhoto = () => {
  similarPhotos.forEach(({url, comments, likes}) => {
    const photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;
    similarFragment.append(photoElement);
  });
  picturesContainer.append(similarFragment);
};

export {renderOtherUsersPhoto};


