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
    const num_suggestions = suggestedFriends.length;
    if (num_suggestions <= 0) {
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
    } else {
      const slides = [];
      for (let i = 0; i < suggestedFriends.length; i += 3) {
        const chunk = suggestedFriends.slice(i, i + 3);
        slides.push(
          <Carousel.Item className="ml-5 mb-5 mt-2 mr-2" key={i}>
            <div className="d-flex justify-content-center">
              {chunk.map((friend) => (
                <div key={friend.id} className="mx-2">
                  <SuggestedFriendCard
                    profile={friend}
                    sendFriendRequest={sendFriendRequest}
                    navigateToProfile={navigateToProfile}
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        );
      }
      return slides;
    }
  };

  const profileCards = () => {};

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {carouselItems()}
    </Carousel>
  );
}
