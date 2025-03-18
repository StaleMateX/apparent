import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import { useNavigate } from "react-router-dom";

export function Map() {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  // console.log(import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);
  // console.log("Mapbox Token:", MAPBOX_TOKEN);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/profile/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data); // Save user data
      })
      .catch((error) => console.error("Error fetching user profile:", error));
  }, []);

  const [viewport, setViewport] = useState({
    latitude: 40.77,
    longitude: -111.838,
    zoom: 14.5,
  });

  const [pins, setPins] = useState([]); // Local state for pins
  const [newPin, setNewPin] = useState(null); // Temporarily store coordinates of a new pin
  const [formData, setFormData] = useState({
    title: "",
    about: "",
    specificLocation: "",
    availableTime: "",
    contactInfo: "",
  }); // Form data for new pin
  const [selectedPin, setSelectedPin] = useState(null); // Pin currently selected
  const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active

  // Fetch pins from backend on component load
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/pins/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authentication
      },
    })
      .then((response) => response.json())
      .then((data) =>
        setPins(
          data.map((pin) => ({
            ...pin,
            specificLocation: pin.specific_location,
            availableTime: pin.available_time,
            contactInfo: pin.contact_info,
          }))
        )
      )
      .catch((error) => console.error("Error fetching pins:", error));
  }, []);

  // Handle right click to add a pin
  const handleRightClick = (event) => {
    const { lngLat } = event;
    setNewPin({ longitude: lngLat.lng, latitude: lngLat.lat });
  };

  // Save new pin to backend
  const handleSavePin = () => {
    fetch("http://127.0.0.1:8000/api/pins/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formData,
        specific_location: formData.specificLocation,
        available_time: formData.availableTime,
        contact_info: formData.contactInfo,
        longitude: newPin.longitude,
        latitude: newPin.latitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPins([
          ...pins,
          {
            ...data,
            specificLocation: data.specific_location,
            availableTime: data.available_time,
            contactInfo: data.contact_info,
          },
        ]); // Add the new pin to the state
        setNewPin(null); // Close the popup
        setFormData({
          title: "",
          about: "",
          specificLocation: "",
          availableTime: "",
          contactInfo: "",
        }); // Reset form data
      })
      .catch((error) => console.error("Error saving pin:", error));
  };

  // Delete a pin from backend
  const handleDeletePin = (id) => {
    fetch(`http://127.0.0.1:8000/api/pins/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setPins(pins.filter((pin) => pin.id !== id)); // Remove the pin locally
        setSelectedPin(null); // Close the popup if the pin was selected
      })
      .catch((error) => console.error("Error deleting pin:", error));
  };

  const handleSaveEdit = () => {
    fetch(`http://127.0.0.1:8000/api/pins/${selectedPin.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...selectedPin,
        specific_location: formData.specificLocation,
        available_time: formData.availableTime,
        contact_info: formData.contactInfo,
      }),
    })
      .then((response) => response.json())
      .then((updatedPin) => {
        setPins(
          pins.map((pin) =>
            pin.id === updatedPin.id
              ? {
                  ...updatedPin,
                  specificLocation: updatedPin.specific_location,
                  availableTime: updatedPin.available_time,
                  contactInfo: updatedPin.contact_info,
                }
              : pin
          )
        ); // Update the pin in local state
        setIsEditing(false); // Exit editing mode
      })
      .catch((error) => console.error("Error updating pin:", error));
  };

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        onMove={(event) => setViewport(event.viewState)} // Enable panning and zooming
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onContextMenu={handleRightClick} // Right-click to add pin
      >
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            longitude={pin.longitude}
            latitude={pin.latitude}
          >
            <div
              onClick={() => {
                setSelectedPin(pin);
                setIsEditing(false); // Ensure we're not in edit mode
              }}
              style={{
                cursor: "pointer",
                fontSize: "24px", // Larger pin
                color: "red",
              }}
            >
              📍
            </div>
          </Marker>
        ))}

        {newPin && (
          <Popup
            longitude={newPin.longitude}
            latitude={newPin.latitude}
            anchor="top"
            closeOnClick={false}
            onClose={() => setNewPin(null)}
          >
            <div
              style={{
                background: "#333",
                color: "#fff",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <input
                type="text"
                placeholder="What is this for?"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  padding: "5px",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                placeholder="About"
                value={formData.about || ""}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  padding: "5px",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                placeholder="Specific Location"
                value={formData.specificLocation || ""}
                onChange={(e) =>
                  setFormData({ ...formData, specificLocation: e.target.value })
                }
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  padding: "5px",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                placeholder="Available Time"
                value={formData.availableTime || ""}
                onChange={(e) =>
                  setFormData({ ...formData, availableTime: e.target.value })
                }
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  padding: "5px",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                }}
              />
              <textarea
                placeholder="Contact Information"
                value={formData.contactInfo || ""}
                onChange={(e) =>
                  setFormData({ ...formData, contactInfo: e.target.value })
                }
                style={{
                  width: "100%",
                  marginBottom: "5px",
                  padding: "5px",
                  borderRadius: "3px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={handleSavePin}
                style={{
                  background: "#555",
                  color: "#fff",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Save Pin
              </button>
            </div>
          </Popup>
        )}

        {selectedPin && (
          <Popup
            longitude={selectedPin.longitude}
            latitude={selectedPin.latitude}
            anchor="top"
            closeOnClick={false}
            onClose={() => setSelectedPin(null)}
          >
            <div
              style={{
                background: "#333",
                color: "#fff",
                padding: "15px",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    placeholder="What is this for?"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <textarea
                    placeholder="About"
                    value={formData.about}
                    onChange={(e) =>
                      setFormData({ ...formData, about: e.target.value })
                    }
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <textarea
                    placeholder="Specific Location"
                    value={formData.specificLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specificLocation: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <textarea
                    placeholder="Available Time"
                    value={formData.availableTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availableTime: e.target.value,
                      })
                    }
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <textarea
                    placeholder="Contact Information"
                    value={formData.contactInfo}
                    onChange={(e) =>
                      setFormData({ ...formData, contactInfo: e.target.value })
                    }
                    style={{
                      width: "100%",
                      marginBottom: "5px",
                      padding: "5px",
                      borderRadius: "3px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    onClick={handleSaveEdit}
                    style={{
                      background: "#555",
                      color: "#fff",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <h3 style={{ marginBottom: "10px", fontSize: "20px" }}>
                    {selectedPin.title}
                  </h3>
                  <p>
                    <strong>About:</strong> {selectedPin.about}
                  </p>
                  <p>
                    <strong>Specific Location:</strong>{" "}
                    {selectedPin.specificLocation}
                  </p>
                  <p>
                    <strong>Available Time:</strong> {selectedPin.availableTime}
                  </p>
                  <p>
                    <strong>Contact Information:</strong>{" "}
                    {selectedPin.contactInfo}
                  </p>

                  {currentUser &&
                    selectedPin.user.username === currentUser.username && (
                      <>
                        <button
                          onClick={() => {
                            setIsEditing(true);
                            setFormData({
                              title: selectedPin.title,
                              about: selectedPin.about,
                              specificLocation: selectedPin.specificLocation,
                              availableTime: selectedPin.availableTime,
                              contactInfo: selectedPin.contactInfo,
                            });
                          }}
                          style={{
                            background: "#555",
                            color: "#fff",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            marginTop: "10px",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePin(selectedPin.id)}
                          style={{
                            background: "#ff4d4d",
                            color: "#fff",
                            padding: "5px 10px",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            marginTop: "10px",
                            marginLeft: "5px",
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                </>
              )}
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}
