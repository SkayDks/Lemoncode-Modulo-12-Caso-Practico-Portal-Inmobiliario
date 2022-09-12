import { getRoomWord } from '../../common/mappers';

const mapPropertyFromApiToViewModel = (property) => {
  return {
    id: property.id,
    title: property.title,
    rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
    squareMeter: `${property.squareMeter}m2`,
    notes: `${property.notes.substring(0, 240)}...`,
    price: `${property.price.toLocaleString()} €`,
    image: Array.isArray(property.images) ? property.images[0] : '',
  };
};

export const mapPropertyListFromApiToViewModel = (propertyList) =>
  propertyList.map((property) => mapPropertyFromApiToViewModel(property));

export const mapFilterToQueryParams = (filter) => {
  let queryParams = '';
  if (filter.saleType)
    queryParams += `saleTypeIds_like=${filter.saleType}&`;
  if (filter.province) queryParams += `provinceId=${filter.province}&`;
  if (filter.room) queryParams += `rooms_gte=${filter.room}&`;
  if (filter.bathroom)
    queryParams += `bathrooms_gte=${filter.bathroom}&`;
  if (filter.minPrice) queryParams += `price_gte=${filter.minPrice}&`;
  if (filter.maxPrice) queryParams += `price_lte=${filter.maxPrice}&`;
  return queryParams.slice(0, -1);
};
