import { onSetError, onSubmitForm } from '../../common/helpers';
import {
  formatDeleteFeatureButtonId,
  onAddFeature,
  onAddImage,
  onRemoveFeature,
} from './upload-property.helpers';
import { fromValidation } from './upload-property.validators';
import '../../core/content/css/upload-property.style.css';

export const onChangeCheckBox = (e, key, uploadArraysList) => {
  if (e.target.checked) {
    uploadArraysList[key] = [...uploadArraysList[key], e.target.value];
  } else {
    uploadArraysList[key] = uploadArraysList[key].filter(
      (word) => word !== e.target.value
    );
  }
  fromValidation.validateField(key, uploadArraysList[key]).then((result) => {
    onSetError(key, result);
  });
};

export const onChangeMainFeatures = (newFeature, uploadArraysList) => {
  onAddFeature(newFeature);
  uploadArraysList.mainFeatures = [
    ...uploadArraysList.mainFeatures,
    newFeature,
  ];
  uploadArraysList.mainFeatures.map((key) => {
    onSubmitForm(formatDeleteFeatureButtonId(key), () => {
      onRemoveFeature(key);
      uploadArraysList.mainFeatures = uploadArraysList.mainFeatures.filter(
        (word) => word !== key
      );
    });
  });
};

export const onChangeImage = (value, uploadArraysList) => {
  onAddImage(value);
  let imageId = createDeleteButtonImg(value);
  uploadArraysList.images = [...uploadArraysList.images, value];

  onSubmitForm(formatDeleteFeatureButtonId(imageId), () => {
    onRemoveImage(imageId);
    uploadArraysList.images = uploadArraysList.images.filter(
      (word) => word !== value
    );
  });
};

// Creo el identificador de la imagen para poder borrarla de ser necesario
const createImgId = (img) => {
  const randomNumA = Math.floor(Math.random() * 100) + 35;
  const randomNumB = Math.floor(Math.random() * 100) + 35;
  return (
    img.substring(randomNumA, randomNumA + 5) +
    img.substring(randomNumB, randomNumB + 5)
  );
};

// Creo una funcion de eliminacion de la imagen basandome en el onRemoveFeatures()
const onRemoveImage = (image) => {
  const imageContainer = document.getElementById(`delete-${image}`);
  const mainImagelement = imageContainer.parentNode;
  mainImagelement.parentNode.removeChild(mainImagelement);
};

// Creo el boton de borrado con los componentes necesarios basandome en el onAddFeature
// le puse otro nombre por que solo crea el boton
const createDeleteButtonImg = (img) => {
  const deleteImgId = createImgId(img);
  const imagesList = document.querySelectorAll('.add_img');
  const lastImage = imagesList[imagesList.length - 1];
  const imageDeleteButtonContainer = document.createElement('div');
  imageDeleteButtonContainer.id = `delete-${deleteImgId}`;
  imageDeleteButtonContainer.classList.add('feature');
  imageDeleteButtonContainer.classList.add('delete-img');

  const deleteButton = document.createElement('button');
  deleteButton.id = formatDeleteFeatureButtonId(deleteImgId);
  deleteButton.type = 'button';

  imageDeleteButtonContainer.appendChild(deleteButton);
  lastImage.appendChild(imageDeleteButtonContainer);
  
  // Como necesito el id del boton lo saco con un retunr para poderlo usar
  return deleteImgId;
};
