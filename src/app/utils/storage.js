// Universal storage utility supporting both desktop JSON files and browser localStorage
// For browser environment (PWA)
export const getData = (key, def = []) => {
  if (typeof window === "undefined") return def;
  try {
    // For browser environment
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : def;
  } catch (error) {
    console.error(`Error getting data for key "${key}":`, error);
    return def;
  }
};

export const setData = (key, data) => {
  if (typeof window === "undefined") return;
  try {
    // For browser environment
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error setting data for key "${key}":`, error);
  }
};

// For desktop environment (would use fs module in Node.js)
// This is a simplified version for browser - in a real desktop app,
// you'd use Node.js fs module to write to JSON files
export const saveToFile = async (key, data) => {
  // In a browser environment, we'll use localStorage
  // In a Node.js environment (desktop), you would use fs.writeFileSync
  setData(key, data);
};

export const loadFromFile = (key, def = []) => {
  // In a browser environment, we'll use localStorage
  // In a Node.js environment (desktop), you would use fs.readFileSync
  return getData(key, def);
};
