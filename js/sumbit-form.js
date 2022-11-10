const uploadFileControl = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('#upload-cancel');
const submitFormButton = document.querySelector('#upload-submit');
const editForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const formInputs = document.querySelectorAll('.img-upload__field-wrapper');
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAG_COUNT = 5;

const openEditForm = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeEditFormByClick);
  document.addEventListener('keydown', closeEditFormByEsc);
};

const closeForm = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileControl.value = null;
  closeFormButton.removeEventListener('click', closeEditFormByClick);
  document.removeEventListener('keydown', closeEditFormByEsc);
};

function closeEditFormByClick() {
  closeForm();
}

function closeEditFormByEsc(evt) {
  if (evt.key === 'Escape') {
    closeForm();
  }
}

formInputs.forEach((item) => {
  item.addEventListener('keydown', (evt) => { evt.stopPropagation();});
});

uploadFileControl.addEventListener('change', openEditForm);

const checkHashtagsCount = (items) => items.length <= MAX_HASHTAG_COUNT;
const isValidHashtag = (item) => VALID_HASHTAG.test(item);
const isUniqueHashtags = (items) => {
  const lowerCaseHashtags = items.map((element) => element.toLowerCase());
  const uniqeHashtags = new Set(lowerCaseHashtags);
  return lowerCaseHashtags.length === uniqeHashtags.size;
};

const validateHashtags = (data) => {
  const hashtags = data
    .split(' ')
    .filter((element) => !!element);
  const isValid = checkHashtagsCount(hashtags) && isUniqueHashtags(hashtags) && hashtags.every(isValidHashtag);
  if (!isValid) {
    submitFormButton.disabled = true;
  } else {
    submitFormButton.disabled = false;
  }
  return isValid;
};

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
};

const pristine = new Pristine(editForm, pristineConfig, true);

pristine.addValidator(
  hashtagInput,
  validateHashtags,
  'Недопустимый тип хэштега'
);

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


