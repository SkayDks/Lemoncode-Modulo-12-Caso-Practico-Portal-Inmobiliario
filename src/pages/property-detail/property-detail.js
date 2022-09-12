import { getPropertyList, getEquipmentsList } from '../../common/api';
import { history, routes } from '../../core/router';
import { mapPropertyDetailFromApiToViewModel } from './property-detail.mappers';
import { setPropertyValues } from './property-detail.helpers';
import { fromValidation } from './property-validators';
import {
  onUpdateField,
  onSubmitForm,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers';
import { insertContact } from './property-detail.api';

const params = history.getParams();

const isEditMode = Boolean(params.id);
if (!isEditMode) history.push(routes.propertyList);

Promise.all([getPropertyList(`id=${params.id}`), getEquipmentsList()]).then(
  ([property, equipmentsList]) => {
    setPropertyValues(
      mapPropertyDetailFromApiToViewModel(property[0], equipmentsList)
    );
  }
);

let contact = {
  email: '',
  message: '',
};

Object.keys(contact).map((key) => {
  onUpdateField(key, (e) => {
    const value = e.target.value;
    contact = { ...contact, [key]: value };

    fromValidation.validateField(key, contact[key]).then((result) => {
      onSetError(key, result);
    });
  });
});

onSubmitForm('contact-button', () => {
  fromValidation.validateForm(contact).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded)
      insertContact(contact)
        .then(() => history.back())
        .catch((response) => console.log(response.data));
  });
});
