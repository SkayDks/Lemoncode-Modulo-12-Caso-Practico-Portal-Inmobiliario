import { setCheckboxList, setOptionList } from './upload-property.helpers';
import { insertNewProperty } from './upload-property.api';
import { mapUploadPropertyFromViewModelToApi } from './upload-property.mappers';
import {
  getEquipmentsList,
  getProvinceList,
  getSaleTypeList,
} from '../../common/api';
import {
  onAddFile,
  onSetError,
  onSetFormErrors,
  onSubmitForm,
  onUpdateField,
} from '../../common/helpers';
import {
  fromNewFeatureValidation,
  fromValidation,
} from './upload-property.validators';
import { history } from '../../core/router';
import {
  onChangeCheckBox,
  onChangeImage,
  onChangeMainFeatures,
} from './upload-property.extra.helpers';

let upload = {
  title: '',
  notes: '',
  email: '',
  phone: '',
  price: '',
  address: '',
  city: '',
  province: '',
  squareMeter: '',
  rooms: '',
  bathrooms: '',
  locationUrl: '',
  newFeature: '',
};

let uploadArrays = {
  equipments: [],
  mainFeatures: [],
  images: [],
  saleTypes: [],
};

Promise.all([getEquipmentsList(), getSaleTypeList(), getProvinceList()]).then(
  ([equipmentsList, saleTypesList, provinceList]) => {
    setCheckboxList(equipmentsList, 'equipments');
    setCheckboxList(saleTypesList, 'saleTypes');
    setOptionList(provinceList, 'province');
  }
);

Object.keys(upload).map((key) =>
  onUpdateField(key, (e) => {
    upload = { ...upload, [key]: e.target.value };
    fromValidation.validateField(key, upload[key]).then((result) => {
      onSetError(key, result);
    });
  })
);

onUpdateField('equipments', (e) => {
  onChangeCheckBox(e, 'equipments', uploadArrays);
});

onUpdateField('saleTypes', (e) => {
  onChangeCheckBox(e, 'saleTypes', uploadArrays);
});

onSubmitForm('insert-feature-button', () => {
  fromNewFeatureValidation
    .validateField('newFeature', upload.newFeature)
    .then((result) => {
      onSetError('newFeature', result);
      if (result.succeeded) {
        onChangeMainFeatures(upload.newFeature, uploadArrays);
      }
      upload.newFeature = '';
    });
});

onAddFile('add-image', (img) => {
  onChangeImage(img, uploadArrays);
});

onSubmitForm('save-button', () => {
  fromValidation.validateForm({ ...upload, ...uploadArrays }).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
      const uploadParams = mapUploadPropertyFromViewModelToApi(
        upload,
        uploadArrays
      );
      insertNewProperty(uploadParams)
        .then(() => history.back())
        .catch((response) => console.log(response.data));
    }
  });
});
