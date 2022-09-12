import { getBathroomWord, getRoomWord } from '../../common/mappers';

export const mapPropertyDetailFromApiToViewModel = (
  property,
  equipmentsList
) => {
  return {
    id: property.id,
    title: property.title,
    notes: property.notes,
    price: `${property.price.toLocaleString()} €`,
    city: property.city,
    squareMeter: `${property.squareMeter}m2`,
    rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
    bathrooms: `${property.bathrooms} ${getBathroomWord(property.bathrooms)}`,
    locationUrl: property.locationUrl,
    mainFeatures: property.mainFeatures,
    equipments: mapEquipmentFromApiToPropertyDetail(
      equipmentsList,
      property.equipmentIds
    ),
    mainImage: property.images[0],
    images: property.images,
  };
};

const mapEquipmentFromApiToPropertyDetail = (
  equipmentsList,
  propertyEquipmentList
) =>
  propertyEquipmentList.map(
    (propertyEquipment) =>
      equipmentsList.find((equipment) => equipment.id == propertyEquipment).name
  );

// const mapEquipmentFromApiToViewModel = (equipmentsList) =>
//   equipmentsList.map((equipments) => equipments.name);
