import './form.js';
import './filter.js';
import './upload-preview.js';
import { showBigPicture } from './show-big-picture.js';
import { showAlert } from './utils.js';
import { getData } from './api.js';
// import { debounce } from './utils.js';
import { setOnFilterClick } from './filter.js';
// import { renderOtherUsersPhoto } from './render-thumbnails.js';

// const RERENDERED_DELAY = 500;
getData((data) => {
  showBigPicture(data);
  setOnFilterClick(data, showBigPicture);
}, showAlert);

