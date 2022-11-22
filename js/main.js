import './form.js';
import './filter.js';
import './upload-preview.js';
import { showBigPicture } from './show-big-picture.js';
import { showAlert, debounce } from './utils.js';
import { getData } from './api.js';
import { renderPhotos} from './render-thumbnails.js';
import {
  setOnFilterClick,
  sortDefaultPhotos,
  sortDiscussedPhotos,
  sortRandomPhotos
} from './filter.js';

getData((data) => {
  showBigPicture(data, sortDefaultPhotos);
  setOnFilterClick(debounce(() => renderPhotos(data, sortDiscussedPhotos)), 'discussed');
  setOnFilterClick(debounce(() => renderPhotos(data, sortRandomPhotos)), 'random');
  setOnFilterClick(debounce(() => renderPhotos(data, sortDefaultPhotos)), 'default');
}, showAlert);

