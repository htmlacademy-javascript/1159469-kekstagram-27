const getRandomPositiveInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const checkCommentLength = (newComment, maxLength) => newComment.length <= maxLength;

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.width = 'auto';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '50%';
  alertContainer.style.bottom = '10%';
  alertContainer.style.transform = 'translateX(-50%)';
  alertContainer.style.padding = '15px 15px';
  alertContainer.style.fontSize = '22px';
  alertContainer.style.lineHeight = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#B22222';
  alertContainer.style.backgroundColor = '#F08080';
  alertContainer.style.borderRadius = '10px ';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

export { getRandomPositiveInteger, getRandomArrayElement, checkCommentLength, showAlert };
