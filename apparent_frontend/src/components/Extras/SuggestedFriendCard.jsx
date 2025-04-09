import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./SuggestedFriendsCarousel.css";

export function SuggestedFriendCard({ profile, sendFriendRequest, navigateToProfile }) {
  return (
    <Card className="suggested-card">
      <Card.Img
        variant="top"
        alt="Suggested Friend's Picture"
        src={
          profile.profile_image
            ? profile.profile_image
            : "../../APParent_Logo.png"
        }
      />
      <Card.Body>
        <Card.Title className="text-center">
          {profile.first_name
            ? `${profile.first_name} ${profile.last_name}`
            : `${profile.username}`}
        </Card.Title>
        <Button
          className="m-1"
          variant="info"
          onClick={() => navigateToProfile(profile)}
        >
          See Profile
        </Button>
        <Button variant="primary" onClick={() => sendFriendRequest(profile)}>
          Add Friend
        </Button>
      </Card.Body>
    </Card>
  );
}
