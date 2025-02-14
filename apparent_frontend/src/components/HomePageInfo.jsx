import { Link } from "react-router-dom";
import uSign from "../u_sign.jpg";
import "./HomePageInfo.css";

export function HomePageInfo() {
  return (
    <div className="home-container">
      <h1 className="welcome-text">Welcome to APParent</h1>
      <img src={uSign} alt="APParent Logo" className="uSign" />
      <div className="intro-section">
        <p>
          Our project, <strong className="brand-color-light">APParent</strong>,
          is designed to help student parents navigate the challenges of
          balancing academics and childcare. One of the primary issues student
          parents are facing is finding affordable, reliable childcare,
          coordinating parent-share opportunities, and connecting with other
          parents to share resources and advice.
        </p>
        <p>
          <strong className="brand-color-light">APParent</strong> solves these
          problems by providing a platform for real-time communication,
          community support, and resource sharing.
        </p>
        <div className="sign-in-message">
          <span>
            Sign in with your <strong>school email</strong> for more detailed
            features!
          </span>
        </div>
      </div>
    </div>
  );
}
