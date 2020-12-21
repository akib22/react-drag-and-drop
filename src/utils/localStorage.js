const LOCAL_STORAGE_ITEM_NAME = 'droppedImages';

export const loadState = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (err) {
    return null;
  }
};

export const saveState = (state) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(state));
  } catch {
    console.error('error in persisting data.');
  }
};
