import "./Button.css";
import { ReactComponent as HeartIcon } from "../../resources/media/heart-icon.svg";
import { ReactComponent as ImagesIcon } from "../../resources/media/images-icon.svg";
import { ReactComponent as CommentIcon } from "../../resources/media/comment-icon.svg";

interface ButtonProps {
  width?: string;
  height?: string;
  text: string;
  onClick?: () => void;
  styling:
    | "secondary-outline"
    | "accent-outline"
    | "accent-fill"
    | "secondary-fill";
  icon?: "heart" | "comment" | "images";
  className?: string;
  style?: React.CSSProperties;
  textColor?: string;
}

const iconComponents = {
  heart: <HeartIcon />,
  images: <ImagesIcon />,
  comment: <CommentIcon />,
};

export const Button = ({
  width,
  height,
  styling,
  text,
  onClick,
  icon,
  style,
  className,
  textColor,
}: ButtonProps) => {
  return (
    <button
      className={`${className || ""} button ${styling}`}
      style={{ ...style, color: textColor, width, height }}
      onClick={onClick}
    >
      {text}
      {icon && iconComponents[icon]}
    </button>
  );
};
