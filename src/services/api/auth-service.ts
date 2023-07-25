import storageStore from "@/utils/storage-store";
import { storyClient } from "./story-client";
import apiConfig from "@/constants/api";

type RegisterInput = { name: string; email: string; password: string };
type LoginInput = Omit<RegisterInput, "name">;

const login = async (credentials: LoginInput) => {
  try {
    const response = await storyClient.post("login", credentials);
    const accessToken = response.data.loginResult.token;
    await storageStore.set(apiConfig.AUTH_STORAGE_KEY, accessToken);
  } catch (e: any) {
    throw new Error(e.response.data.message);
  }
};

const register = async (credentials: RegisterInput) => {
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
