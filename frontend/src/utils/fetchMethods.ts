const baseUserURI = "http://localhost:3001/user/";

export const get: (path: string) => Promise<any> = async (path) => {
  const response = await fetch(baseUserURI + path);
  return await response.json();
};

export const put: (path: string, data: {}) => Promise<Response> = (
  path,
  data,
) => {
  return fetch(baseUserURI + path, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const post: (path: string, data: {}) => Promise<Response> = (
  path,
  data,
) => {
  return fetch(baseUserURI + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
