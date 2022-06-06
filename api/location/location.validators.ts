import Location from "./location.models"

export const validateTitle = async (title :string ) => {
  const exist = await Location.findOne({ title });
  if (exist) {
    throw new Error(`El title ${title} esta registrado`);
  }
};

export const validationLocationId = async (id: string) => {
  const exist = await Location.findById(id);
  if (!exist) {
    throw new Error(`El id ${id} no existe`);
  }
};
