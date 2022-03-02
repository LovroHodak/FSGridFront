const API_URL = "http://localhost:5000";

// GET USERS
export async function getUsers() {
  const response = await fetch(`${API_URL}/api/users`);

  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.message, data);
  }
  return data;
}

// POST PHOTO
export async function postPhoto(photoData) {
  const response = await fetch(`${API_URL}/api/addPhoto`, {
    method: "POST",
    body: photoData,
  });

  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.message, data);
  }
  return data;
}

// GET PHOTOS
export async function getPhotos() {
  const response = await fetch(`${API_URL}/api/photos`);

  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.message, data);
  }
  return data;
}
