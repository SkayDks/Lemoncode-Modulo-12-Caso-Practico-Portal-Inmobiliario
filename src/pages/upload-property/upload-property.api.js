import Axios from 'axios';

const uploadPropertytUrl = `${process.env.BASE_API_URL}/properties`;

export const insertNewProperty = (uploadProperty) =>
  Axios.post(uploadPropertytUrl, uploadProperty).then((response) => response.data);
