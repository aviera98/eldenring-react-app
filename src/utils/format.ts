export const safeText = (value?: string | null, fallback = 'Unknown') => {
  const trimmed = value?.trim();

  if (trimmed === '') {
    return fallback;
  }

  return trimmed ?? fallback;
};

export const shortText = (value?: string | null, max = 140) => {
  const text = safeText(value, '');

  if (text.length <= max) {
    return text;
  }

  return `${text.slice(0, max).trimEnd()}...`;
};

export const toDisplayValue = (value?: number | string | null, fallback = 'N/A') => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  return String(value);
};
