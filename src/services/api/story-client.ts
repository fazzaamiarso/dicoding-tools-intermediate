/* eslint-disable import/prefer-default-export */
import axios from "axios";
import apiConfig from "@/constants/api";
import storageStore from "@/utils/storage-store";

export const storyClient = axios.create({ baseURL: apiConfig.STORY_BASE_URL });

storyClient.interceptors.request.use(async (req) => {
  const accessToken = await storageStore.get(apiConfig.AUTH_STORAGE_KEY);
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
});
