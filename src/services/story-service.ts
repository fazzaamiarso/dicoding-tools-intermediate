import axios from "axios";
import { Story } from "@/types";

const BASE_URL = "https://story-api.dicoding.dev/v1/";
const AUTH_KEY = "monogatari_access_token";

const getAccessToken = () => localStorage.getItem(AUTH_KEY);
const putAccessToken = (accessToken: string) => localStorage.setItem(AUTH_KEY, accessToken);
const clearAccessToken = () => localStorage.removeItem(AUTH_KEY);

const storyClient = axios.create({ baseURL: BASE_URL });

storyClient.interceptors.request.use((req) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    req.headers.Authorization = `Bearer ${getAccessToken()}`;
  }
  return req;
});

const getAllStories = async () => {
  try {
    const response = await storyClient.get("stories");
    return { error: false, data: response.data.listStory as Story[] };
  } catch (e: any) {
    return { error: true, message: e.response.data.message };
  }
};

const addStory = async (data: { description: string; photo: File }) => {
  try {
    await storyClient.post("stories", data, { headers: { "Content-Type": "multipart/form-data" } });
    return { error: false, message: "Success" };
  } catch (e: any) {
    return { error: true, message: e.response.data.message };
  }
};

const login = async (credentials: { email: string; password: string }) => {
  try {
    const response = await storyClient.post("login", credentials);
    const accessToken = response.data.loginResult.token;
    putAccessToken(accessToken);
    return { error: false, message: "Success" };
  } catch (e: any) {
    return { error: true, message: e.response.data.message };
  }
};

const register = async (credentials: { name: string; email: string; password: string }) => {
  try {
    await storyClient.post("register", credentials);
    return { error: false, message: "Success" };
  } catch (e: any) {
    return { error: true, message: e.response.data.message };
  }
};

const logout = () => {
  clearAccessToken();
};

const isAuthenticated = () => getAccessToken() !== null;

export default {
  getAllStories,
  addStory,
  register,
  login,
  logout,
  isAuthenticated,
};
