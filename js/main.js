import './form.js';
import './upload-preview.js';
import { showBigPicture } from './show-big-picture.js';
import { showAlert } from './utils.js';
import { getData } from './api.js';

getData(showBigPicture, showAlert);
