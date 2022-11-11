import {getRandomPositiveInteger, getRandomArrayElement} from './utils.js';
import {PHOTOS_COUNT, AVATARS_COUNT, LIKES_COUNT, NAMES, COMMENTS, DESCRIPTION} from './constants.js';

const createMessage = () => {
  const result = Array.from({length: getRandomPositiveInteger(1, 2)}, () => getRandomArrayElement(COMMENTS));
  return result.join(' ');
};

const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${getRandomPositiveInteger(1, AVATARS_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPublishedPhoto = (index) => {
  const COMMENTS_COUNT = getRandomPositiveInteger(1, 16);
  const similarComments = Array.from({length: COMMENTS_COUNT}, (_, commentID) => createComment(commentID + 1));
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: `${getRandomArrayElement(DESCRIPTION)} фото.`,
    likes: getRandomPositiveInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
    comments: similarComments
  };
};

const createPhotos = () => Array.from({length: PHOTOS_COUNT}, (_, photoID) => createPublishedPhoto(photoID + 1));

export {createPhotos};
