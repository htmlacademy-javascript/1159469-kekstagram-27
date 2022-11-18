// import { renderOtherUsersPhoto, similarPhotos } from './render-thumbnails.js';
// import { similarPhotos } from './render-thumbnails.js';
// import { showBigPicture } from './show-big-picture.js';
import './form.js';
import { showBigPicture } from './show-big-picture.js';
import { showAlert } from './utils.js';
import { getData } from './api.js';

// renderOtherUsersPhoto();
getData(showBigPicture, showAlert);

