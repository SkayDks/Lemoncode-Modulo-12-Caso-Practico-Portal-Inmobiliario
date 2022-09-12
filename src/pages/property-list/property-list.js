import {
  mapPropertyListFromApiToViewModel,
  mapFilterToQueryParams,
} from './property-list.mappers';
import {
  addPropertyRows,
  setOptions,
  clearPropertyRows,
} from './property-list.helpers';
import {
  roomOptions,
  bathroomOptions,
  minPriceOptions,
  maxPriceOptions,
} from './property-list.constants';
import { onSubmitForm, onUpdateField } from '../../common/helpers';
import {
  getPropertyList,
  getProvinceList,
  getSaleTypeList,
} from '../../common/api';

Promise.all([getPropertyList(), getSaleTypeList(), getProvinceList()]).then(
  ([propertyList, saleTypeList, provinceList]) => {
    loadPropertyList(propertyList);
    setOptions(saleTypeList, 'select-sale-type', '¿Qué venta?');
    setOptions(provinceList, 'select-province', '¿Dónde?');
    setOptions(roomOptions, 'select-room', '¿Habitaciones?');
    setOptions(bathroomOptions, 'select-bathroom', '¿Cuartos de baño?');
    setOptions(minPriceOptions, 'select-min-price', 'MIN(EUR)');
    setOptions(maxPriceOptions, 'select-max-price', 'MAX(EUR)');
  }
);

const loadPropertyList = (propertyList) => {
  const viewModelPropertyList = mapPropertyListFromApiToViewModel(propertyList);
  addPropertyRows(viewModelPropertyList);
};

let filter = {
  saleType: '',
  province: '',
  room: '',
  bathroom: '',
  minPrice: '',
  maxPrice: '',
};

const trasnformWord = (word) => {
  let newWord;
  word.split('').map((letter, i) => {
    if (letter === letter.toUpperCase()) {
      newWord = `${word.slice(0, i)}-${word.slice(i).toLowerCase()}`;
    }
  });
  return `select-${newWord ? newWord : word}`;
};

Object.keys(filter).map((key) => {
  const inputID = trasnformWord(key);
  onUpdateField(inputID, (e) => {
    filter = {
      ...filter,
      [key]: e.target.value,
    };
  });
});

onSubmitForm('search-button', () => {
  const queryParams = mapFilterToQueryParams(filter);
  clearPropertyRows();
  getPropertyList(queryParams).then((propertyList) =>
    loadPropertyList(propertyList)
  );
});
