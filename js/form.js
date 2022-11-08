const uploadFileControl = document.querySelector('#upload-file');
const imageEditForm = document.querySelector('.img-upload__overlay');
const closeFormButton = document.querySelector('#upload-cancel');
const submitFormButton = document.querySelector('#upload-submit');
const editForm = document.querySelector('.img-upload__form');
const hashtagInput = document.querySelector('.text__hashtags');
const formInputs = document.querySelectorAll('.img-upload__field-wrapper');
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;
const VALID_DIVIDE_HASHTAGS = /(#[a-zа-яё0-9]{1,19}){2}/i;
const MAX_HASHTAG_COUNT = 5;

const openEditForm = () => {
  imageEditForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeFormButton.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeEditFormByEsc);
};

function closeForm() {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFileControl.value = null;
  closeFormButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeEditFormByEsc);
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

const getArrayFromTags = (data) => {
  const hashtags = data
    .split(' ')
    .filter((element) => !!element);
  return hashtags;
};

const disableSubmitButton = (flag) => {
  if (!flag) {
    submitFormButton.disabled = true;
  } else {
    submitFormButton.disabled = false;
  }
};

const validateHashtagsCount = (value) => {
  const tagsArray = getArrayFromTags(value);
  const isValid = checkHashtagsCount(tagsArray);
  disableSubmitButton(isValid);
  return isValid;
};

const validateHashtagsUnique = (value) => {
  const tagsArray = getArrayFromTags(value);
  const isValid = isUniqueHashtags(tagsArray);
  disableSubmitButton(isValid);
  return isValid;
};

const validateHashtagSymbols = (value) => {
  const tagsArray = getArrayFromTags(value);
  const isValid = tagsArray.every(isValidHashtag);
  disableSubmitButton(isValid);
  return isValid;
};

const checkSpaceBetweenTags = (hashtagString) => {
  const isValid = !hashtagString.match(VALID_DIVIDE_HASHTAGS);
  disableSubmitButton(isValid);
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
  validateHashtagsCount,
  'Недопустимое количество хэштегов'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagsUnique,
  'Хэштеги не должны повторятся'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagSymbols,
  'Недопустимый формат хэштега'
);

pristine.addValidator(
  hashtagInput,
  checkSpaceBetweenTags,
  'Хэштеги должны разделяться пробелами'
);

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

