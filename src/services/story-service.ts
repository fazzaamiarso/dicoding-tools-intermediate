import { Story } from "@/types";
import { storyClient } from "./api/story-client";

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

export default {
  getAllStories,
  addStory,
};
