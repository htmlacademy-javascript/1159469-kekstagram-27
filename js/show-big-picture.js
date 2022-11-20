import { renderOtherUsersPhoto } from './render-thumbnails.js';

const showBigPicture = (similarPhotos, cb) => {
  renderOtherUsersPhoto(similarPhotos, cb);
  const photoFilters = document.querySelector('.img-filters');
  photoFilters.classList.remove('img-filters--inactive');
  const COUNT = 5;
  let userPhoto;
  let currentCount = 0;
  const modalBigPicture = document.querySelector('.big-picture');
  const otherUsersPhotos = document.querySelectorAll('.picture');
  const closeButton = modalBigPicture.querySelector('.big-picture__cancel');
  const loadCommentButton = modalBigPicture.querySelector('.comments-loader');
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const commentsList = document.querySelector('.social__comments');

  const addComments = () => {
    const { comments } = userPhoto;
    comments.slice(currentCount, COUNT + currentCount).forEach(({ avatar, name, message }) => {
      const commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = avatar;
      commentElement.querySelector('.social__picture').alt = name;
      commentElement.querySelector('.social__text').textContent = message;
      commentsList.append(commentElement);
    });
    currentCount += comments.length - currentCount > COUNT ? COUNT : comments.length - currentCount;
    const currentCountElement = document.querySelector('.comments-current-count');
    currentCountElement.textContent = currentCount;
    if (currentCount >= comments.length) {
      loadCommentButton.classList.add('hidden');
    } else {
      loadCommentButton.classList.remove('hidden');
    }
  };

  const hideModal = () => {
    modalBigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    loadCommentButton.removeEventListener('click', addComments);
    currentCount = 0;
    userPhoto = null;
  };

  const openBigPicture = () => {
    const hideModalByClick = () => {
      hideModal();
      closeButton.removeEventListener('click', hideModalByClick);
      document.removeEventListener('keydown', hideModalByEscape);
    };
    function hideModalByEscape(evt) {
      if (evt.key === 'Escape') {
        hideModal();
      }
      closeButton.removeEventListener('click', hideModalByClick);
      document.removeEventListener('keydown', hideModalByEscape);
    }
    commentsList.innerHTML = ' ';
    modalBigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    closeButton.addEventListener('click', hideModalByClick);
    document.addEventListener('keydown', hideModalByEscape);
  };

  const addPhotoContent = (photo, usersPhotos) => {
    openBigPicture();
    const bigPictureId = +photo.id;
    userPhoto = usersPhotos.find((item) => item.id === bigPictureId);
    addComments();
    const bigPictureDescription = modalBigPicture.querySelector('.social__caption');
    const bigPictureUrl = modalBigPicture.querySelector('.big-picture__img > img');
    const bigPictureLikes = modalBigPicture.querySelector('.likes-count');
    const bigPictureCommentsCount = modalBigPicture.querySelector('.comments-count');
    bigPictureUrl.src = photo.querySelector('.picture__img').src;
    bigPictureLikes.textContent = photo.querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = photo.querySelector('.picture__comments').textContent;
    bigPictureDescription.textContent = userPhoto.description;

    loadCommentButton.addEventListener('click', addComments);
  };
  for (const node of otherUsersPhotos) {
    node.addEventListener('click', () => addPhotoContent(node, similarPhotos));
  }
};

export { showBigPicture };
