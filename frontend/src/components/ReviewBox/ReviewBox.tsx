import "./ReviewBox.css";

import { title } from "process";
import internal from "stream";

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
      <img src={profilePic} alt="" className="trip-page-profilepic" />
      <h3>{author}</h3>
      <h3>{travels}</h3>
      <div className="reviewe-contain-container flex-row"></div>
      <p>{title}</p>
      <p>{content}</p>
      <p>{rating}</p>
    </div>
  );
};
