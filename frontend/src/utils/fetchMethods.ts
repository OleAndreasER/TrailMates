const baseUserURI = "http://localhost:3001/user/";

export const get: (path: string) => Promise<any> = async (path) => {
  const response = await fetch(baseUserURI + path);
  return await response.json();
};

export const put: (path: string, data: {}) => void = (path, data) => {
  fetch(baseUserURI + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.error(error);
  });
};

export const post: (path: string, data: {}) => void = (path, data) => {
  fetch(baseUserURI + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.error(error);
  });
};
