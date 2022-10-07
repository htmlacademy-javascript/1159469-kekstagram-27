const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};


getRandomPositiveInteger(1, 10);

const checkCommentLength = (newComment, maxLength) => newComment.length <= maxLength;

checkCommentLength('Всем привет!', 12);
