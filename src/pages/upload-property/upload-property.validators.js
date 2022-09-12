import { Validators, createFormValidation } from '@lemoncode/fonk';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';
import { isNumber } from '@lemoncode/fonk-is-number-validator';
import { isUrl } from '@lemoncode/fonk-is-url-validator';

const validationSchema = {
  field: {
    title: [{ validator: Validators.required, message: 'Campo requerido' }],
    notes: [{ validator: Validators.required, message: 'Campo requerido' }],
    email: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: Validators.email, message: 'Email no valido' },
    ],
    phone: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: isNumber.validator, message: 'No ha introducido un numero' },
      {
        validator: Validators.pattern,
        message: 'No es un telefono valido',
        customArgs: { pattern: /^[6-9]\d{8}$/ },
      },
    ],
    price: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: isNumber.validator, message: 'No ha introducido un numero' },
    ],
    address: [{ validator: Validators.required, message: 'Campo requerido' }],
    city: [{ validator: Validators.required, message: 'Campo requerido' }],
    province: [{ validator: Validators.required, message: 'Campo requerido' }],
    squareMeter: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: isNumber.validator, message: 'No ha introducido un numero' },
    ],
    rooms: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: isNumber.validator, message: 'No ha introducido un numero' },
    ],
    bathrooms: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: isNumber.validator, message: 'No ha introducido un numero' },
    ],
    locationUrl: [
      { validator: Validators.required, message: 'Campo requerido' },
      { validator: isUrl.validator, message: 'Url no valida' },
      {
        validator: Validators.pattern,
        message: 'No es un mapa de google',
        customArgs: {
          pattern: /^(https?\:\/\/www\.google\.com\/maps\/embed\?pb=\S*)$/,
        },
      },
    ],
    //checkbox
    saleTypes: [
      { validator: Validators.required, message: 'Campo requerido' },
      {
        validator: arrayRequired.validator,
        message: 'No es una lista',
        customArgs: { minLength: 1 },
      },
    ],
    equipments: [
      {
        validator: arrayRequired.validator,
        message: 'No es una lista',
        customArgs: { minLength: 0 },
      },
    ],
    //arrays
    mainFeatures: [
      {
        validator: arrayRequired.validator,
        message: 'No es una lista',
        customArgs: { minLength: 0 },
      },
    ],
    images: [
      { validator: Validators.required, message: 'Campo requerido' },
      {
        validator: arrayRequired.validator,
        message: 'No es una lista de imagenes',
        customArgs: { minLength: 1 },
      },
    ],
  },
};

const newFeatureValidationSchema = {
  field: {
    newFeature: [
      { validator: Validators.required, message: 'Campo requerido' },
    ],
  },
};

export const fromValidation = createFormValidation(validationSchema);
export const fromNewFeatureValidation = createFormValidation(
  newFeatureValidationSchema
);
