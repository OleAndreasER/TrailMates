import "./CommentForm.css";
import profilepic from "../../components/assets/profilepic.png";
import { Button } from "../Button/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CommentForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const handleCloseClick = () => {
    onClose();
  };
  if (!isOpen) {
    return null;
  }

  return (
    <div className="comment-form">
      <div className="comment-form-user-info">
        <div className="comment-form-user-info-container flex-row">
          <div className="comment-form-user-info-profile flex-column">
            <img className="comment-form-profile-pic" src={profilepic} alt="" />
            <h3>Username</h3>
            <p>10 reiser</p>
          </div>
          <div className="comment-form-user-info-rating flex-column">
            <h2>Hvordan rater du denne reisen?</h2>
            <p>1/5</p>
          </div>
        </div>
      </div>
      <div className="comment-form-comment">
        <h2>Skriv en tittel her</h2>
        <p>Aa..</p>
      </div>
      <div className="comment-form-actions flex-row">
        <a href="#">Avbryt</a>
        <Button
          text={"Legg ut kommentar"}
          styling={"secondary-fill"}
          height={"4vh"}
          width={"14vw"}
          fontSize={"1.3vw"}
        />
      </div>
    </div>
  );
};
