import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
  secure: true
});

export async function uploadImage(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "apollofyImages",
    });
    return result;
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    throw error;
  }
}

// Función para cargar archivos de audio
export async function uploadAudio(filePath: string) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "apollofyAudio",
      resource_type: 'video', // Utiliza 'video' para archivos de audio
    });
    return result;
  } catch (error) {
    console.error('Error al subir el archivo de audio a Cloudinary:', error);
    throw error;
  }
}

export const deleteImage = async (imageId: string) => {
  return await cloudinary.uploader.destroy(imageId);
};
