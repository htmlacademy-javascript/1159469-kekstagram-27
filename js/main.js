const getRandom = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }

  if (min > max) {
    return Math.round(Math.random() * (min - max) + max);
  }
  return Math.round(Math.random() * (max - min) + min);
};

getRandom(1, 10);

const isValidLength = (newComment, maxLength) => newComment.length <= maxLength;

isValidLength('Всем привет!', 12);
