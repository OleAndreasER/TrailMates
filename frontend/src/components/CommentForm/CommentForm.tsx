import "./CommentForm.css";
import profilepic from "../../components/assets/profilepic.png";
import { Button } from "../Button/Button";
import arrow from "../../components/assets/comment_form_arrow.svg";
import star from "../../components/assets/Star.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /*user: User*/
}

export const CommentForm: React.FC<Props> = ({ isOpen, onClose /*user*/ }) => {
  const handleCloseClick = () => {
    onClose();
  };
  if (!isOpen) {
    return null;
  }

  return (
    <div className="image-carousel-overlay flex-row">
      <form className="comment-form">
        <div className="comment-form-user-info-container flex-row">
          <div className="comment-form-user-info-profile flex-column">
            <img
              className="comment-form-profile-pic"
              src={profilepic} /*user.profilePic*/
              alt=""
            />
            <h3>Username {/*user.name*/}</h3>
            <p>10 reiser {/*user.tripCount*/}</p>
          </div>
          <div className="comment-form-user-info-rating flex-column">
            <h2>Hvordan rater du denne reisen?</h2>
            <div className="comment-form-user-info-rating-value flex-row">
              <input
                placeholder="0"
                className="comment-form-field"
                maxLength={1}
              />
              <p>/ 5</p>
              <img
                src={star}
                alt="rating symbol"
                style={{ width: "1.6vw", height: "auto", marginLeft: "10%" }}
              />
            </div>
          </div>
        </div>
        <div className="comment-form-comment flex-column">
          <input
            type="text"
            placeholder="Overskrift"
            className="comment-form-input comment-form-field"
          />
          <textarea
            placeholder="Aa"
            className="comment-form-field comment-form-textarea"
          />
        </div>
        <div className="comment-form-actions flex-row">
          <div className="comment-form-actions-close flex-row">
            <img src={arrow} alt="back icon" />
            <a onClick={handleCloseClick}>Avbryt</a>
          </div>
          <Button
            text={"Legg ut kommentar"}
            styling={"secondary-fill"}
            height={"4vh"}
            width={"14vw"}
            fontSize={"1.3vw"}
            /*onClick={sendComment}*/
          />
        </div>
      </form>
    </div>
  );
};
