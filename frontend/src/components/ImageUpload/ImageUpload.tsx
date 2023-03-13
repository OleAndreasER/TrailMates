import "./ImageUpload.css";
import { ChangeEvent, useState } from "react";
import { ReactComponent as RightButton } from "../assets/caro/carousel_right.svg";
import { ReactComponent as LeftButton } from "../assets/caro/carousel_left.svg";

interface Props {
  setImageIds: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}

interface ImageData {
  id: string;
  file: File;
  url: string;
}

const ImageUpload = ({ setImageIds, setFiles }: Props) => {
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleFilesChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.currentTarget.files;
    setFiles(selectedFiles);
    setImageIds([]);

    const imageDataArray: ImageData[] = [];

    for (let i = 0; i < (selectedFiles?.length || 0); i++) {
      const id = crypto.randomUUID();
      setImageIds((prev) => {
        return [...prev, id];
      });
      const file = selectedFiles![i];
      const url = URL.createObjectURL(file);

      const imageData: ImageData = {
        id: id,
        file: file,
        url: url,
      };

      imageDataArray.push(imageData);
    }

    setImageDataList(imageDataArray);
  };

  const handlePrevClick = () => {
    setActiveIndex(
      activeIndex === 0 ? imageDataList.length - 1 : activeIndex - 1,
    );
  };

  const handleNextClick = () => {
    setActiveIndex(
      activeIndex === imageDataList.length - 1 ? 0 : activeIndex + 1,
    );
  };

  return (
    <div className="flex-column">
      {imageDataList.length > 0 && (
        <div className="image-preview-container flex-column">
          <div
            className="image-preview"
            style={{
              backgroundImage: `url(${imageDataList[activeIndex].url})`,
            }}
          />
        </div>
      )}
      <div className="flex-row preview-controllers">
        <LeftButton
          className={
            imageDataList.length > 0 ? "image-carousel-button" : "hide"
          }
          onClick={handlePrevClick}
        />
        <RightButton
          className={
            imageDataList.length > 0 ? "image-carousel-button" : "hide"
          }
          onClick={handleNextClick}
        />
        <input
          type="file"
          name="image"
          onChange={handleFilesChanged}
          accept="image/*"
          multiple={true}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
