import "./ProfileItem.css";
import { User } from "../../types/user";

interface Props {
  info: string;
  title: string;
}

export const ProfileItem = ({ info, title }: Props) => {
  return (
    <div className="container-inforow flex-column">
      <h3>{title}</h3>
      <div className="user-context flex-row">
        <p>{info}</p>
        <a className="edit-button">Rediger</a>
      </div>
      <div className="seperator"></div>
    </div>
  );
};
