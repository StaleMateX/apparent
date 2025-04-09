import { SuggestedFriendCard } from "./SuggestedFriendCard";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import "./SuggestedFriendsCarousel.css";

export function SuggestedFriendsCarousel({
  suggestedFriends,
  sendFriendRequest,
  navigateToProfile,
}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  const carouselItems = () => {
    if (suggestedFriends.length > 0) {
      return suggestedFriends.map((profile) => (
        <Carousel.Item className="ml-5 mb-5 mt-2 mr-2" key={profile.id}>
          <SuggestedFriendCard
            profile={profile}
            sendFriendRequest={sendFriendRequest}
            navigateToProfile={navigateToProfile}
          />
        </Carousel.Item>
      ));
    } else {
      return (
        <Carousel.Item key={0}>
          <Image
            alt="APParent Logo"
            className=""
            src="../../Apparent_Logo.png"
          />
          <Carousel.Caption>
            <h3>Word of mouth can do wonders. Tell your friends about us!</h3>
          </Carousel.Caption>
        </Carousel.Item>
      );
    }
  };

  const profileCards = () => {};

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {carouselItems()}
    </Carousel>
  );
}
