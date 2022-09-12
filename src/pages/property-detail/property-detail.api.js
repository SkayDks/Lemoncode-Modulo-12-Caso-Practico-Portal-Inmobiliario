import Axios from 'axios';

const contactUrl = `${process.env.BASE_API_URL}/contact`;

export const insertContact = (contact) =>
  Axios.post(contactUrl, contact).then((response) => response.data);
