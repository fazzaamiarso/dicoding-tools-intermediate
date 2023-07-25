import storageStore from "@/utils/storage-store";
import { storyClient } from "./story-client";
import apiConfig from "@/constants/api";

const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await storyClient.post("login", credentials);
    const accessToken = response.data.loginResult.token;
    await storageStore.set(apiConfig.AUTH_STORAGE_KEY, accessToken);
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
};

const register = async (credentials: { name: string; email: string; password: string }) => {
  try {
    await storyClient.post("register", credentials);
    return { error: false, message: "Success" };
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
};

const logout = async () => {
  await storageStore.remove(apiConfig.AUTH_STORAGE_KEY);
};

const isAuthenticated = async () => (await storageStore.get(apiConfig.AUTH_STORAGE_KEY)) !== null;

export default { login, register, logout, isAuthenticated };
