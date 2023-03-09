import { ChangeEvent } from "react";

interface Props {
  setImageIds: React.Dispatch<React.SetStateAction<string[]>>;
  setFiles: React.Dispatch<React.SetStateAction<FileList | null>>;
}

const ImageUpload = ({ setImageIds, setFiles }: Props) => {
  const handleFilesChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.currentTarget.files;
    setFiles(selectedFiles);
    setImageIds([]);

    for (let i = 0; i < (selectedFiles?.length || 0); i++) {
      const id = crypto.randomUUID();
      setImageIds((prev) => {
        return [...prev, id];
      });
    }
  };

  return (
    <input
      type="file"
      name="image"
      onChange={handleFilesChanged}
      accept="image/*"
      multiple={true}
    />
  );
};

export default ImageUpload;
