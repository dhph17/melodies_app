import { PUBLIC_API_ENDPOINT } from '@/app/config'
export const fetchApiData = async (endpoint, method, body, token, offset, page) => {
  let url = `${PUBLIC_API_ENDPOINT}${endpoint}`;
  console.log(url);
  if (offset !== undefined && offset !== null) {
    url += `?offset=${offset}`;
  }

  if (page !== undefined && page !== null) {
    url += `?page=${page}`;
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  const options = {
    method,
    headers,
    ...(body && { body }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || "Network response was not ok" };
    }
  } catch (error) {
    return { success: false, error: (error).message || "An unexpected error occurred" };
  }
};
