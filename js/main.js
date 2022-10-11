const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const checkCommentLength = (newComment, maxLength) => newComment.length <= maxLength;

checkCommentLength('Всем привет!', 15);

const PHOTOS_COUNT = 25;

const NAMES = [
  'Артём',
  'Добрыня',
  'Зигмунд',
  'Люций',
  'Азамат',
  'Панкрат',
  'Анастасия',
  'Генриетта',
  'Корнелия',
  'Мишель',
  'Ребекка',
  'Фатима'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Крутое',
  'Класcное',
  'Ужасное',
  'Красивое',
  'Необычное',
  'Изумительное',
  'Милое',
  'Страшное',
  'Размытое',
  'Цветное',
  'Любимое',
  'Интересное',
  'Удачное',
  'Неудачное',
  'Яркое',
  'Грустное',
  'Сказочное',
  'Мрачное',
  'Памятное',
  'Откровенное'
];

const photosId = Array.from({length: PHOTOS_COUNT}, (v, i) => i + 1);
const photosUrl = Array.from({length: PHOTOS_COUNT}, (v, i) => i + 1);
const commentsId = [];

const getPhotoData = (data) => {
  const index = getRandomPositiveInteger(0, data.length - 1);
  const result = data[index];
  data.splice(index, 1);
  return result;
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComment = () => {
  let commentId = getRandomPositiveInteger(1, 99999);
  while (commentsId.includes(commentId)) {
    commentId = getRandomPositiveInteger(1, 99999);
  }
  commentsId.push(commentId);
  return {
    id: commentsId[commentsId.length - 1],
    avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES)
  };
};

const createPublishedPhoto = () => {
  const COMMENTS_COUNT = getRandomPositiveInteger(1, 10);
  const similarComments = Array.from({length: COMMENTS_COUNT}, createComment);
  return {
    id: getPhotoData(photosId),
    url: `photos/${getPhotoData(photosUrl)}.jpg`,
    description: `${getRandomArrayElement(DESCRIPTION)} фото.`,
    likes: getRandomPositiveInteger(15, 200),
    comments: similarComments
  };
};

const similarPhotos = Array.from({length: PHOTOS_COUNT}, createPublishedPhoto);

function testFunction(data) {
  return data;
}

testFunction(similarPhotos);
