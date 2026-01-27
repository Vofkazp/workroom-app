import api from "./Api";
import {ApiError, ApiResponse, ResponseFile} from "../interfaces/AuthInterface";
import {useNotifications} from "./NitificationProvider";

export function useFile() {
  const {addNotification} = useNotifications();

  const UploadImage = async (formData: FormData) => {
    try {
      const {data} = await api.post<ApiResponse<ResponseFile>>(`/files`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  };

  const getImage = async (publicId: string, type: string) => {
    try {
      const {data} = await api.get<ApiResponse<ResponseFile>>(`/files?publicId=${publicId}&type=${type}`);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  }

  const deleteFile = async (publicId: string, type: string) => {
    try {
      const {data} = await api.delete<ApiResponse<boolean>>(`/files?publicId=${publicId}&type=${type}`);
      return data;
    } catch (error) {
      const err = error as ApiError;
      addNotification(err.message, "warning")
      return err;
    }
  }

  return {UploadImage, getImage, deleteFile};
}