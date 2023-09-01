import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../config";

export const uploadFile = async (file, identifier) => {
  const fileRef = ref(storage, identifier);
  return new Promise(async (resolve) => {
    await uploadBytes(fileRef, file);
    const uploadedResUrl = await getDownloadURL(fileRef);
    resolve({ status: true, identifier, url: uploadedResUrl });
  });
};

export const deleteFile = (identifier) => {
  const deleteRef = ref(storage, identifier);
  return new Promise(async (resolve) => {
    deleteObject(deleteRef)
      .then((res) => resolve({ status: true, ...res }))
      .catch((error) => resolve({ status: false, error }));
  });
};

export const updateFile = (file, identifier) => {
  return new Promise(async (resolve) => {
    const deleteRes = await deleteFile(identifier);
    if (deleteRes.status) {
      const res = await uploadFile(file, identifier);
      resolve(res);
    }
  });
};
