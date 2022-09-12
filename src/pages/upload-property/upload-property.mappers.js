export const mapUploadPropertyFromViewModelToApi = (upload, uploadArrays) => {
  return {
    title: upload.title,
    notes: upload.notes,
    email: upload.email,
    phone: upload.phone,
    price: upload.price,
    saleTypeIds: uploadArrays.saleTypes,
    address: upload.address,
    city: upload.address,
    provinceId: upload.province,
    squareMeter: upload.squareMeter,
    rooms: upload.rooms,
    bathrooms: upload.bathrooms,
    locationUrl: upload.locationUrl,
    mainFeatures: uploadArrays.mainFeatures,
    equipmentIds: uploadArrays.equipments,
    images: uploadArrays.images,
  };
};
