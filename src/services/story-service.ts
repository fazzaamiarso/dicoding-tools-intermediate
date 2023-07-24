import axios from "axios";
import type { Story } from "@/types";

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

const getAllStories = async (): Promise<Story[]> => {
  const response = await storyClient.get("stories");
  return response.data.listStory;
};

const login = async (credentials: { email: string; password: string }) => {
  const response = await storyClient.post("login", credentials);
  const accessToken = response.data.loginResult.token;
  putAccessToken(accessToken);
};

const register = async (credentials: { name: string; email: string; password: string }) => {
  await storyClient.post("register", credentials);
  await login({ email: credentials.email, password: credentials.password });
};

const logout = () => {
  clearAccessToken();
};

const isAuthenticated = () => getAccessToken() !== null;

export default {
  getAllStories,
  register,
  login,
  logout,
  isAuthenticated,
};
