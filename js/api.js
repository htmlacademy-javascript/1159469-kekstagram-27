const showSuccesMessage = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);
  const closeSuccessButton = successMessage.querySelector('.success__button');
  document.body.append(successMessage);
  closeSuccessButton.addEventListener('click', () => hideMesage(successMessage));
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      hideMesage(successMessage);
    }
  });
};

const showErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const closeErrorButton = errorMessage.querySelector('.error__button');
  document.body.append(errorMessage);
  closeErrorButton.addEventListener('click', () => hideMesage(errorMessage));
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      hideMesage(errorMessage);
    }
  });
};

function hideMesage(element) {
  element.classList.add('hidden');
}

const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    });
};

const sendData = (onSuccess, form) => {
  fetch('https://27.javascript.pages.academy/kekstagram1',
    {
      method: 'POST',
      body: form
    })
    .then((response) => {
      if (response.ok) {
        showSuccesMessage();
        onSuccess();
      } else {
        showErrorMessage();
      }
    });
};

export { getData, sendData };
