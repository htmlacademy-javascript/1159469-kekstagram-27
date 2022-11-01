const hideModal = (pictureNode) => {
  pictureNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const showBigPicture = (similarPhotos) => {
  const modalBigPicture = document.querySelector('.big-picture');
  const otherUsersPhotos = document.querySelectorAll('.picture');
  const closeButton = modalBigPicture.querySelector('.big-picture__cancel');
  const loadCommentButton = modalBigPicture.querySelector('.comments-loader');
  const commentCounter = modalBigPicture.querySelector('.social__comment-count');
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  const commentsList = document.querySelector('.social__comments');
  const openBigPicture = () => {
    const hideModalByClick = () => {
      hideModal(modalBigPicture);
      closeButton.removeEventListener('click', hideModalByClick);
      document.removeEventListener('keydown', hideModalByEscape);
    };
    function hideModalByEscape(evt) {
      if (evt.key === 'Escape') {
        hideModal(modalBigPicture);
      }
      closeButton.removeEventListener('click', hideModalByClick);
      document.removeEventListener('keydown', hideModalByEscape);
    }
    commentsList.innerHTML = ' ';
    modalBigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    commentCounter.classList.add('hidden');
    loadCommentButton.classList.add('hidden');
    closeButton.addEventListener('click', hideModalByClick);
    document.addEventListener('keydown', hideModalByEscape);
  };
  const addPhotoContent = (photo, usersPhotos) => {
    openBigPicture();
    const bigPictureId = +photo.id;
    const { comments, description } = usersPhotos.find((item) => item.id === bigPictureId);
    comments.forEach(({ avatar, name, message }) => {
      const commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('.social__picture').src = avatar;
      commentElement.querySelector('.social__picture').alt = name;
      commentElement.querySelector('.social__text').textContent = message;
      commentsList.append(commentElement);
    });
    const bigPictureDescription = modalBigPicture.querySelector('.social__caption');
    const bigPictureUrl = modalBigPicture.querySelector('.big-picture__img > img');
    const bigPictureLikes = modalBigPicture.querySelector('.likes-count');
    const bigPictureCommentsCount = modalBigPicture.querySelector('.comments-count');
    bigPictureUrl.src = photo.querySelector('.picture__img').src;
    bigPictureLikes.textContent = photo.querySelector('.picture__likes').textContent;
    bigPictureCommentsCount.textContent = photo.querySelector('.picture__comments').textContent;
    bigPictureDescription.textContent = description;
  };
  for (const userPhoto of otherUsersPhotos) {
    userPhoto.addEventListener('click', () => addPhotoContent(userPhoto, similarPhotos));
  }
};

export { showBigPicture };
