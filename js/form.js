import { sliderContainerElement } from './slider.js';
import { sendData } from './api.js';
import { showAlert } from './utils.js';

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
const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomInputElement = document.querySelector('.scale__control--value');
const imgPrewiew = document.querySelector('.img-upload__preview img');
const ZOOM_STEP = 25;
let zoomValue = +zoomInputElement.value.slice(0, -1);

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
  imgPrewiew.className = null;
  imgPrewiew.style.filter = null;
  editForm.reset();
  sliderContainerElement.classList.add('visually-hidden');
  closeFormButton.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeEditFormByEsc);
  zoomOutButton.removeEventListener('click', decreaseScaleHandler);
  zoomInButton.removeEventListener('click', increaseScaleHandler);
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

// const disableSubmitButton = (flag) => {
//   if (!flag) {
//     submitFormButton.disabled = true;
//   } else {
//     submitFormButton.disabled = false;
//   }
// };

const validateHashtagsCount = (value) => {
  const tagsArray = getArrayFromTags(value);
  const isValid = checkHashtagsCount(tagsArray);
  // disableSubmitButton(isValid);
  return isValid;
};

const validateHashtagsUnique = (value) => {
  const tagsArray = getArrayFromTags(value);
  const isValid = isUniqueHashtags(tagsArray);
  // disableSubmitButton(isValid);
  return isValid;
};

const validateHashtagSymbols = (value) => {
  const tagsArray = getArrayFromTags(value);
  const isValid = tagsArray.every(isValidHashtag);
  // disableSubmitButton(isValid);
  return isValid;
};

const checkSpaceBetweenTags = (hashtagString) => {
  const isValid = !hashtagString.match(VALID_DIVIDE_HASHTAGS);
  // disableSubmitButton(isValid);
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
  checkSpaceBetweenTags,
  'Хэштеги должны разделяться пробелами'
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
  validateHashtagsCount,
  'Недопустимое количество хэштегов'
);

function decreaseScaleHandler() {
  if (zoomValue > 25) {
    zoomValue -= ZOOM_STEP;
    zoomInputElement.value = `${zoomValue}%`;
    imgPrewiew.style.transform = `scale(${zoomValue / 100})`;
  }
}

function increaseScaleHandler() {
  if (zoomValue < 100) {
    zoomValue += ZOOM_STEP;
    zoomInputElement.value = `${zoomValue}%`;
    imgPrewiew.style.transform = `scale(${zoomValue / 100})`;
  }
}

zoomOutButton.addEventListener('click', decreaseScaleHandler);
zoomInButton.addEventListener('click', increaseScaleHandler);


const showStatusMessage = (typeMessage) => {
  const messageTemplate = document.querySelector(`#${typeMessage}`).content.querySelector(`.${typeMessage}`);
  const messageElement = messageTemplate.cloneNode(true);
  const closeMessageButton = messageElement.querySelector(`.${typeMessage}__button`);
  const hideMessageByEsc = (evt) => {
    evt.stopImmediatePropagation();
    if (evt.key === 'Escape') {
      messageElement.classList.add('hidden');
      document.removeEventListener('keydown', hideMessageByEsc, {capture: true});
    }
  };
  const hideMessageByClickOutside = (evt) => {
    if (evt.target === messageElement) {
      messageElement.classList.add('hidden');
      document.removeEventListener('keydown', hideMessageByClickOutside);
    }
  };
  document.body.append(messageElement);
  closeMessageButton.addEventListener('click', () => messageElement.classList.add('hidden'));
  document.addEventListener('keydown', hideMessageByEsc, {capture: true});
  document.addEventListener('click', hideMessageByClickOutside);
};

const blockSubmitButton = () => {
  submitFormButton.disabled = true;
  submitFormButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitFormButton.disabled = false;
  submitFormButton.textContent = 'Опубликовать';
};

const onSendDataError = () => {
  showStatusMessage('error');
  unblockSubmitButton();
};

const onSendDataSuccess = () => {
  closeForm();
  showStatusMessage('success');
  unblockSubmitButton();
};

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(formData, onSendDataSuccess, onSendDataError);
  } else {
    showAlert('Форма невалидна');
  }
});
