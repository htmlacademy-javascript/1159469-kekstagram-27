import './form.js';
import './filter.js';
import './upload-preview.js';
import { showBigPicture } from './show-big-picture.js';
import { showAlert, debounce } from './utils.js';
import { getData } from './api.js';
import {
  setOnFilterClick,
  sortDefaultPhotos,
  sortDiscussedPhotos,
  sortRandomPhotos
} from './filter.js';

getData((data) => {
  showBigPicture(data, sortDefaultPhotos);
  setOnFilterClick(debounce(() => showBigPicture(data, sortDiscussedPhotos)), 'discussed');
  setOnFilterClick(debounce(() => showBigPicture(data, sortRandomPhotos)), 'random');
  setOnFilterClick(debounce(() => showBigPicture(data, sortDefaultPhotos)), 'default');
}, showAlert);

