import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true
});

// Función para cargar imágenes
export async function uploadImage(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'apollofyImages',
    });
    return result;
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    throw error;
  }
}

export const deleteImage = async (imageId: string) => {

  return await cloudinary.uploader.destroy(imageId)

};


