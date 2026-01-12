import api from "./Api";
import {ResponseAxios, ResponseFile, ResponseFileResult} from "../interfaces/AuthInterface";

export function useFile() {
  const UploadImage = async (formData: FormData) => {
    try {
      const response: ResponseAxios<ResponseFile> = await api.post(`/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch {

    }
  };

  const getImage = async (publicId: string, type: string) => {
    try {
      const response: ResponseAxios<ResponseFile> = await api.get(`/files?publicId=${publicId}&type=${type}`);
      return response.data;
    } catch {

    }
  }

  const deleteFile = async (publicId: string, type: string) => {
    try {
      const response: ResponseAxios<ResponseFileResult> = await api.delete(`/files?publicId=${publicId}&type=${type}`);
      return response.data;
    } catch {

    }
  }

  return {UploadImage, getImage, deleteFile};
}