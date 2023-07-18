import data from "@/DATA";
import { Story } from "@/types";

const stories = data.listStory;

const getAllStories = async (): Promise<Story[]> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(stories), 2000);
  });

export default {
  getAllStories,
};
