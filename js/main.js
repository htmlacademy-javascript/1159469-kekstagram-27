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
const AVATARS_COUNT = 6;
const LIKES_COUNT = {
  MIN: 15,
  MAX: 200
};

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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

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
  const COMMENTS_COUNT = getRandomPositiveInteger(1, 10);
  const similarComments = Array.from({length: COMMENTS_COUNT}, (_, commentID) => createComment(commentID + 1));
  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: `${getRandomArrayElement(DESCRIPTION)} фото.`,
    likes: getRandomPositiveInteger(LIKES_COUNT.MIN, LIKES_COUNT.MAX),
    comments: similarComments
  };
};

const similarPhotos = Array.from({length: PHOTOS_COUNT}, (_, photoID) => createPublishedPhoto(photoID + 1));

function testFunction(data) {
  return data;
}

testFunction(similarPhotos);
