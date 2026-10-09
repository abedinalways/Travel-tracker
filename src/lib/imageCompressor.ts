import imageCompression from "browser-image-compression";

export async function compressAndConvertToBase64(file: File): Promise<string> {
  const options = {
    maxSizeMB: 0.25,
    maxWidthOrHeight: 1080,
    useWebWorker: true,
    fileType: "image/webp",
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return await fileToBase64(compressedFile);
  } catch (err) {
    console.error("Compression failed, fallback to original", err);
    return await fileToBase64(file);
  }
}

function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
