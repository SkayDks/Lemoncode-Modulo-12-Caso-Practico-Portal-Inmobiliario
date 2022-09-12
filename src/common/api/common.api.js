import Axios from 'axios';

const equipmentListUrl = `${process.env.BASE_API_URL}/equipments`;
const propertiesListUrl = `${process.env.BASE_API_URL}/properties`;
const saleTypeListUrl = `${process.env.BASE_API_URL}/saleTypes`;
const provinceListUrl = `${process.env.BASE_API_URL}/provinces`;

export const getPropertyList = (queryParams) => {
  const query = Boolean(queryParams) ? `?${queryParams}` : '';
  return Axios.get(`${propertiesListUrl}${query}`).then(
    (response) => response.data
  );
};

export const getEquipmentsList = () =>
  Axios.get(equipmentListUrl).then((response) => response.data);
  
export const getSaleTypeList = () =>
  Axios.get(saleTypeListUrl).then((response) => response.data);

export const getProvinceList = () =>
  Axios.get(provinceListUrl).then((response) => response.data);
