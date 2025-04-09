import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

export function Map() {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  // console.log(import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);
  // console.log("Mapbox Token:", MAPBOX_TOKEN);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [viewport, setViewport] = useState({
      latitude: 40.77,
      longitude: -111.838,
      zoom: 14.5,
  });
  const [userLocation, setUserLocation] = useState(null); // Store user location

    const [pins, setPins] = useState([]); // Local state for pins
    const [newPin, setNewPin] = useState(null); // Temporarily store coordinates of a new pin
    const [formData, setFormData] = useState({
        title: "",
        about: "",
        specificLocation: "",
        startTime: "",
        endTime: "",
        contactInfo: "",
    }); // Form data for new pin
    const [selectedPin, setSelectedPin] = useState(null); // Pin currently selected
    const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
              console.log("User Profile Data:", data);
              setCurrentUser(data[0]); // Save user data
          })
          .catch((error) => console.error("Error fetching user profile:", error));

          fetch("http://127.0.0.1:8000/api/pins/", {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
          })
              .then((response) => response.json())
              .then((data) =>
                  setPins(
                      data.map((pin) => ({
                          ...pin,
                          specificLocation: pin.specific_location,
                          startTime: pin.start_time,
                          endTime: pin.end_time,
                          contactInfo: pin.contact_info,
                      }))
                      .reverse()
                  )
              )
              .catch((error) => console.error("Error fetching pins:", error));
      }, []);

    const handleSidebarClick = (pin) => {
        setSelectedPin(pin);
        setViewport({
            latitude: pin.latitude,
            longitude: pin.longitude,
            zoom: 16,
        });
    };

    useEffect(() => {
        // Get current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ latitude, longitude });

                // Optionally, center map on user location
                setViewport((prev) => ({
                    ...prev,
                    latitude,
                    longitude,
                }));
            },
            (error) => console.error("Error getting location:", error),
            { enableHighAccuracy: true }
        );
    }, []);

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
            title: pin.title,
            about: pin.about,
            specificLocation: pin.specific_location,
            startTime: pin.start_time,
            endTime: pin.end_time,
            contactInfo: pin.contact_info,
          }))
          .reverse()
        )
      )
      .catch((error) => console.error("Error fetching pins:", error));
  }, []);

  // Handle right click to add a pin
  const handleRightClick = (event) => {
    const { lngLat } = event;
    setNewPin({
        longitude: lngLat.lng,
        latitude: lngLat.lat });
    setFormData({
      title: "",
      about: "",
      specificLocation: "",
      startTime: "",
      endTime: "",
      contactInfo: "",
    });
  };

  const validatePhoneNumber = (phone) => {
      const phoneRegex = /^\d{10}$/; // Matches exactly 10 digits
      return phoneRegex.test(phone);
  };

  // Save new pin to backend
  const handleSavePin = () => {
    if (!formData.title.trim() || !formData.about.trim() || !formData.specificLocation.trim()) {
        alert("Please fill out all required fields: Title, About, and Specific Location.");
        return;
      }
    if (!validatePhoneNumber(formData.contactInfo)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }
    fetch("http://127.0.0.1:8000/api/pins/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...formData,
        specific_location: formData.specificLocation,
        start_time: formData.startTime,
        end_time: formData.endTime,
        contact_info: formData.contactInfo,
        longitude: newPin.longitude,
        latitude: newPin.latitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const formattedPin = {
          ...data,
          specificLocation: data.specific_location,
          startTime: data.start_time,
          endTime: data.end_time,
          contactInfo: data.contact_info,
        };
        setPins([formattedPin, ...pins]); // Add the new pin to the state
        setNewPin(null); // Close the popup
        setFormData({
          title: "",
          about: "",
          specificLocation: "",
          startTime: "",
          endTime: "",
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
    if (!formData.title.trim() || !formData.about.trim() || !formData.specificLocation.trim()) {
        alert("Please fill out all required fields: Title, About, and Specific Location.");
        return;
      }
    if (!validatePhoneNumber(formData.contactInfo)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }
    fetch(`http://127.0.0.1:8000/api/pins/${selectedPin.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        ...selectedPin,
        title: formData.title,
        about: formData.about,
        specific_location: formData.specificLocation,
        startTime: formData.startTime,
        endTime: formData.endTime,
        contact_info: formData.contactInfo,
      }),
    })
      .then((response) => response.json())
      .then((updatedPin) => {
          const formattedPin = {
              ...updatedPin,
              specificLocation: updatedPin.specific_location,
              startTime: updatedPin.start_time,
              endTime: updatedPin.end_time,
              contactInfo: updatedPin.contact_info,
          };

          setPins(
              pins.map((pin) =>
                  pin.id === updatedPin.id ? formattedPin : pin
              )
        ); // Update the pin in local state
        setIsEditing(false); // Exit editing mode
        setSelectedPin(null);
        setFormData({
          title: "",
          about: "",
          specificLocation: "",
          startTime: "",
          endTime: "",
          contactInfo: "",
        });
      })
      .catch((error) => console.error("Error updating pin:", error));
  };

  return (
      <div className="map-container">
          <div className="sidebar">
              <h2>Pin Information</h2>
              <ul>
                  {pins.map((pin) => (
                      <li
                          key={pin.id}
                          onClick={() => handleSidebarClick(pin)}
                          style={{cursor: "pointer", padding: "5px", borderBottom: "1px solid #ccc"}}
                      >
                          <h4>{pin.title}</h4>
                          <p>{pin.about}</p>
                          <p><strong>Location:</strong> {pin.specificLocation}</p>
                          <p>
                              <strong>Time:</strong>{" "}
                              {new Date(`1970-01-01T${pin.startTime}`).toLocaleTimeString([], {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                              })}{" "}
                              -{" "}
                              {new Date(`1970-01-01T${pin.endTime}`).toLocaleTimeString([], {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                              })}
                          </p>
                      </li>
                  ))}
              </ul>
          </div>

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
                              //console.log("Selected Pin User:", pin.username);
                              //console.log("Current User:", currentUser?.username);
                              setIsEditing(false); // Ensure we're not in edit mode
                          }}
                          style={{
                              cursor: "pointer",
                              fontSize: "24px", // Larger pin
                              filter: pin.username === currentUser?.username ? "hue-rotate(240deg)" : "none", // Adjust hue to get blue for your pins
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
                                  setFormData({...formData, title: e.target.value})
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
                                  setFormData({...formData, about: e.target.value})
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
                                  setFormData({...formData, specificLocation: e.target.value})
                              }
                              style={{
                                  width: "100%",
                                  marginBottom: "5px",
                                  padding: "5px",
                                  borderRadius: "3px",
                                  border: "1px solid #ccc",
                              }}
                          />
                          <div className="time-picker">
                              <TimePicker
                                  onChange={(value) => setFormData({...formData, startTime: value})}
                                  value={formData.startTime}
                                  disableClock={true}
                                  format="h:mm a" // AM/PM format
                              />
                              <span>to</span>
                              <TimePicker
                                  onChange={(value) => setFormData({...formData, endTime: value})}
                                  value={formData.endTime}
                                  disableClock={true}
                                  format="h:mm a"
                              />
                          </div>
                          <textarea
                              placeholder="Contact Information: Please enter 10-digit phone number"
                              value={formData.contactInfo || ""}
                              onChange={(e) =>
                                  setFormData({...formData, contactInfo: e.target.value})
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
                                          setFormData({...formData, title: e.target.value})
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
                                          setFormData({...formData, about: e.target.value})
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
                                  <div className="time-picker">
                                      <TimePicker
                                          onChange={(value) => setFormData({...formData, startTime: value})}
                                          value={formData.startTime}
                                          disableClock={true}
                                          format="h:mm a" // AM/PM format
                                      />
                                      <span>to</span>
                                      <TimePicker
                                          onChange={(value) => setFormData({...formData, endTime: value})}
                                          value={formData.endTime}
                                          disableClock={true}
                                          format="h:mm a"
                                      />
                                  </div>
                                  <textarea
                                      placeholder="Contact Information: Please enter 10-digit phone number"
                                      value={formData.contactInfo}
                                      onChange={(e) =>
                                          setFormData({...formData, contactInfo: e.target.value})
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
                                  <h3 style={{marginBottom: "10px", fontSize: "20px"}}>
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
                                      <strong>Time:</strong>{" "}
                                      {new Date(`1970-01-01T${selectedPin.startTime}`).toLocaleTimeString([], {
                                          hour: "numeric",
                                          minute: "2-digit",
                                          hour12: true,
                                      })}{" "}
                                      -{" "}
                                      {new Date(`1970-01-01T${selectedPin.endTime}`).toLocaleTimeString([], {
                                          hour: "numeric",
                                          minute: "2-digit",
                                          hour12: true,
                                      })}
                                  </p>
                                  <p>
                                      <strong>Contact Information:</strong>{" "}
                                      {selectedPin.contactInfo}
                                  </p>

                                  {currentUser &&
                                      selectedPin.username === currentUser.username && (
                                          <>
                                              <button
                                                  onClick={() => {
                                                      setIsEditing(true);
                                                      setFormData({
                                                          title: selectedPin.title,
                                                          about: selectedPin.about,
                                                          specificLocation: selectedPin.specificLocation,
                                                          startTime: selectedPin.startTime,
                                                          endTime: selectedPin.endTime,
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
              {userLocation && (
                  <Marker longitude={userLocation.longitude} latitude={userLocation.latitude}>
                      <div style={{color: "blue", fontSize: "18px"}}>🔵</div>
                  </Marker>
              )}
          </ReactMapGL>
      </div>

  );
}
