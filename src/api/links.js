const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const listLinks = async () => {
  const response = await fetch(`${API_URL}/api/links`);
  if (!response.ok) {
    throw new Error('Failed to fetch links');
  }
  return response.json();
};

/**
 * Create link
 */
export const createLink = async (payload) => {
  const response = await fetch(`${API_URL}/api/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create link');
  }

  return response.json();
};

/**
 * Get link by CODE
 */
export const getLink = async (code) => {
  const response = await fetch(`${API_URL}/api/links/${code}`);
  if (!response.ok) {
    throw new Error('Failed to fetch link');
  }
  return response.json();
};

/**
 * Delete link by CODE
 */
export const deleteLink = async (code) => {
  const response = await fetch(`${API_URL}/api/links/${code}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete link');
  }

  return response.json();
};

