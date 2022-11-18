const getData = (onSuccess, onFail) => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных, попробуйте перезагрузить страницу');
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err?.message);
    });
};

const sendData = (data, onSuccess = () => {}, onError = () => {}) => {
  fetch('https://27.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body: data
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      onSuccess();
    })
    .catch(onError);
};

export { getData, sendData };
