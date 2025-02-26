import "./UserProfileInfo.css";
import { useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { ProfilePicture } from "../components/ProfilePicture";

// The top portion of the profile page with user info. Write permissions for user/readonly permissions for friends' profile pages.
export function UserProfileInfo() {

  const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Assuming you have an endpoint to get the current user's profile details
        const fetchProfileData = async () => {
            const response = await fetch('http://localhost:8000/api/profile/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Fetched profile data:', data);  // Log the response to see the structure

                if (Array.isArray(data) && data.length > 0) {
                    setFormData((prev) => ({
                        ...prev,
                        uID: data[0].uID || '',
                        firstName: data[0].first_name || '',
                        lastName: data[0].last_name || '',
                        phoneNumber: data[0].phone_number || '',
                        aboutMe: data[0].about_me || '',
                    }));
                }
            }
            setIsLoading(false); // Set loading to false after fetch is complete
        };

        fetchProfileData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };



  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <div className="picture-container mt-2">
          <ProfilePicture className="profile-picture" />
        </div>
        <div className="p-2 info-container">
          <p className="info-text">CollegeName</p>
          <p className="info-text">City, State</p>
          <p className="info-text">Passed Backgroud: True/False/In progress</p>
        </div>
        <div className="p-2 info-container">
          <p className="info-text">Hobbies: ...</p>
          <p className="info-text">Children: 4 yrs, 1 yr, Baby on the way</p>
        </div>
      </Stack>
      <Form className="d-flex centered-label">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label className="centered-label pt-2">About Me</Form.Label>
          <Form.Control
            as="textarea"
            className="bg-color-light hide-scrollbar about-me-form mt-0"
            rows={2}
          />
        </Form.Group>
      </Form>
    </>
  );
}
