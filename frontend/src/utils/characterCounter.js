export const truncateToLimit = (text, limit = 120) => {
  if (text.length <= limit) return text;
  return text.substring(0, limit - 3) + '...';
};

export const getCharCount = (text) => text.length;

export const isNearLimit = (text, limit = 120, threshold = 0.8) => {
  return text.length > limit * threshold;
};

export const calculateProgress = (text, limit = 120) => {
  return Math.min(100, (text.length / limit) * 100);
};