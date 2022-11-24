const FILTER_CLASSES = {
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat'
};

const imgPrewiew = document.querySelector('.img-upload__preview img');
const effectsListElement = document.querySelector('.effects__list');
const depthFilterSlider = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');
export const sliderContainerElement = document.querySelector('.img-upload__effect-level');

const defaultConfigSlider = {
  range: {min: 0, max: 100},
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value;
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value).toFixed(1);
    },
  },
};

noUiSlider.create(depthFilterSlider, defaultConfigSlider);

const handleSliderUpdate = (filterName) => {
  const filterValue = depthFilterSlider.noUiSlider.get();
  effectValueElement.value = filterValue;
  switch (filterName) {
    case 'chrome':
      imgPrewiew.style.filter = `grayscale(${filterValue})`;
      break;
    case 'sepia':
      imgPrewiew.style.filter = `sepia(${filterValue})`;
      break;
    case 'marvin':
      imgPrewiew.style.filter = `invert(${filterValue}%)`;
      break;
    case 'phobos':
      imgPrewiew.style.filter = `blur(${filterValue}px)`;
      break;
    case 'heat':
      imgPrewiew.style.filter = `brightness(${filterValue})`;
      break;
    default:
      imgPrewiew.style.filter = null;
      break;
  }
};

effectsListElement.addEventListener('change', (evt) => {
  imgPrewiew.className = FILTER_CLASSES[evt.target.value];
  depthFilterSlider.noUiSlider.on('update', () => handleSliderUpdate(evt.target.value));
  switch(evt.target.value) {
    case 'chrome':
      depthFilterSlider.noUiSlider.updateOptions({
        range: {min: 0, max: 1},
        step: 0.1,
        start: 1
      });
      sliderContainerElement.classList.remove('visually-hidden');
      break;
    case 'sepia':
      depthFilterSlider.noUiSlider.updateOptions({
        range: {min: 0, max: 1},
        step: 0.1,
        start: 1
      });
      sliderContainerElement.classList.remove('visually-hidden');
      break;
    case 'marvin':
      depthFilterSlider.noUiSlider.updateOptions({
        range: {min: 0, max: 100},
        step: 1,
        start: 100,
      });
      sliderContainerElement.classList.remove('visually-hidden');
      break;
    case 'phobos':
      depthFilterSlider.noUiSlider.updateOptions({
        range: {min: 0, max: 3},
        step: 0.1,
        start: 3,
      });
      sliderContainerElement.classList.remove('visually-hidden');
      break;
    case 'heat':
      depthFilterSlider.noUiSlider.updateOptions({
        range: {min: 1, max: 3},
        step: 0.1,
        start: 3
      });
      sliderContainerElement.classList.remove('visually-hidden');
      break;
    case 'none':
      depthFilterSlider.noUiSlider.updateOptions({
        range: {min: 0, max: 100},
        start: 100,
        step: 1,
      });
      sliderContainerElement.classList.add('visually-hidden');
      break;
  }
});

