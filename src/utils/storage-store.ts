import localforage from "localforage";

const get = async (key: string) => {
  const value = await localforage.getItem(key);
  return value;
};

const set = async <T>(key: string, value: T) => {
  await localforage.setItem(key, value);
};

const remove = async (key: string) => {
  await localforage.removeItem(key);
};

export default { get, set, remove };
