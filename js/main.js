import './form.js';
import './filter.js';
import './upload-preview.js';
import { showBigPicture } from './show-big-picture.js';
import { showAlert } from './utils.js';
import { getData } from './api.js';
import { setOnFilterClick } from './filter.js';

getData((data) => {
  showBigPicture(data);
  setOnFilterClick(data, showBigPicture);
}, showAlert);
