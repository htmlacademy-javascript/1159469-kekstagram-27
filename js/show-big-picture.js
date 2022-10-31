
const modalBigPicture = document.querySelector('.big-picture');
const otherUsersPhotos = document.querySelectorAll('.picture');
const closeButton = modalBigPicture.querySelector('.big-picture__cancel');
const loadCommentButton = modalBigPicture.querySelector('.comments-loader');
const commentCounter = modalBigPicture.querySelector('.social__comment-count');

const openBigPicture = () => {
  modalBigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentCounter.classList.add('hidden');
  loadCommentButton.classList.add('hidden');

  closeButton.addEventListener('click', () => {
    modalBigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      modalBigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};

const addPhotoContent = (photo) => {
  openBigPicture();
  const bigPictureUrl = modalBigPicture.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = modalBigPicture.querySelector('.likes-count');
  const bigPictureCommentsCount = modalBigPicture.querySelector('.comments-count');
  bigPictureUrl.src = photo.querySelector('.picture__img').src;
  bigPictureLikes.textContent = photo.querySelector('.picture__likes').textContent;
  bigPictureCommentsCount.textContent = photo.querySelector('.picture__comments').textContent;
};

for (const userPhoto of otherUsersPhotos) {
  userPhoto.addEventListener('click', () => addPhotoContent(userPhoto));
}


