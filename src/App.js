import "./App.css";
import React, { useRef } from "react";
import { useQuery, useMutation } from "react-query";
import { getUsers, postPhoto, getPhotos } from "./hooks/useQuery";

const API_URL = "http://localhost:5000";

function App() {
  // GET users
  const query = useQuery(["users"], getUsers);
  console.log(query);

  // POST photos
  const photoFormRef = useRef();

  const photoMutation = useMutation(
    (photoFormData) => postPhoto(photoFormData),
    {
      onSuccess: () => photoFormRef.current.reset(),
    }
  );

  function addPhoto(e) {
    e.preventDefault();
    const photoFormData = new FormData(e.target);
    photoMutation.mutate(photoFormData);
    console.log(photoFormData);
    console.log(e.target);
  }

  // GET photos
  const photoQuery = useQuery(["photos"], getPhotos);

  return (
    <div className="App">
      <div style={{ border: "2px solid red" }}>
        <h1>GET USERS</h1>
        {query.data?.map((user, i) => {
          return <p>{user.name}</p>;
        })}
      </div>
      <div style={{ border: "2px solid red" }}>
        <h1>POST PHOTO</h1>
        <form ref={photoFormRef} onSubmit={addPhoto}>
          <input name="image" type="file" alt="image" />
          <button>add photo</button>
        </form>
      </div>
      <div style={{ border: "2px solid red" }}>
        <h1>GET PHOTOS</h1>
        {photoQuery.data?.map((photo, i) => {
          return (
            <div key={i}>
              <img
                src={`${API_URL}/api/images/${photo.image}`}
                alt="img"
                style={{ height: 100 }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
