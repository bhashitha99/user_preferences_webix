export async function sendUpdate(url, data, options = {}) {
  try {
    const response = await fetch(url, {
      method: options.method || "POST",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: JSON.stringify(data),
      ...options.fetchOptions,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
}
