import "./ReviewBox.css";

import { title } from "process";
import internal from "stream";
import star from "../../components/assets/Star.svg";

interface Props {
  title: string;
  content: string;
  author: string;
  rating: string;
  travels: string;
  profilePic: string;
}

export const ReviewBox = ({
  author,
  content,
  travels,
  profilePic,
  title,
  rating,
}: Props) => {
  return (
    <div className="reviewer-container flex-row">
      <div className="review-auther flex-column">
        <img src={profilePic} alt="" />
        <h3>{author}</h3>
        <h5>{travels}</h5>
      </div>

      <div className="reviewe-contain-container flex-column">
        <div className="review-heading flex-row">
          <h2>{title}</h2>
          <div className="review-rating flex-row">
            <h3>{rating}</h3>
            <img src={star} alt="" />
          </div>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};
