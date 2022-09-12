export const getRoomWord = (rooms) =>
  rooms > 1 ? 'habitaciones' : 'habitación';
export const getBathroomWord = (rooms) => (rooms > 1 ? 'baños' : 'baño');
