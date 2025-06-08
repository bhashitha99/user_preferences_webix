

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


export async function saveFormData(url, data) {
  console.log("Saving url:", url);
  console.log("Data to save:", data);
  const token = localStorage.getItem("authToken");
  const response = await fetch(url, {
    method: "PUT", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

export async function fetchData(url) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json",
      Authorization: `Token ${token}`
     }
  });
  if (!response.ok) throw new Error(`GET failed with status ${response.status}`);
  return await response.json();
}