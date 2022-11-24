const VALID_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const photoPreview = document.querySelector('.img-upload__preview img');
const fileInput = document.querySelector('#upload-file');

fileInput.addEventListener('change', () => {
  const uploadPhoto = fileInput.files[0];
  const uploadPhotoName = uploadPhoto.name.toLowerCase();
  const matches = VALID_FILE_TYPES.some((item) => uploadPhotoName.endsWith(item));

  if (matches) {
    photoPreview.src = URL.createObjectURL(uploadPhoto);
  }
});
