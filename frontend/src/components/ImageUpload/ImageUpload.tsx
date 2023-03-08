import { useState, useEffect, useRef } from "react";
import UploadService from "../../services/FileUploadService";
import IFile from "../../types/File";

const ImageUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<Array<string>>([]);
  const [message, setMessage] = useState<Array<string>>([]);
  const [imageInfos, setImageInfos] = useState<Array<IFile>>([]);

  const selectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    let images: Array<string> = [];
    let files = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        images.push(URL.createObjectURL(files[i]));
      }

      setSelectedFiles(files);
      setImagePreviews(images);
      setMessage([]);
    }
  };

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setImageInfos(response.data);
    });
  }, []);

  const uploadImages = () => {
    if (selectedFiles != null) {
      const files = Array.from(selectedFiles);

      let _progressInfos = files.map((file) => ({
        percentage: 0,
        fileName: file.name,
      }));


      const uploadPromises = files.map((file, i) => upload(i, file));

      Promise.all(uploadPromises)
        .then(() => UploadService.getFiles())
        .then((images) => {
          setImageInfos(images.data);
        });

      setMessage([]);
    }
  };

  const upload = (idx: number, file: File) => {
    return UploadService.upload(file)
      .then(() => {
        setMessage((prevMessage) => [
          ...prevMessage,
          file.name + ": Successful!",
        ]);
      })
      .catch((err: any) => {
        let msg = file.name + ": Failed!";
        if (err.response && err.response.data && err.response.data.message) {
          msg += " " + err.response.data.message;
        }

        setMessage((prevMessage) => [...prevMessage, msg]);
      });
  };

  return (
    <div>

      <div className="row my-3">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={selectImages}
            />
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-success btn-sm"
            disabled={!selectedFiles}
            onClick={uploadImages}
          >
            Upload
          </button>
        </div>
      </div>

      {imagePreviews && (
        <div>
          {imagePreviews.map((img, i) => {
            return (
              <img className="preview" src={img} alt={"image-" + i} width="250px" key={i} />
            );
          })}
        </div>
      )}

      {message.length > 0 && (
        <div className="alert alert-secondary mt-2" role="alert">
          <ul>
            {message.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      )}

      {imageInfos.length > 0 && (
        <div className="card mt-3">
          <div className="card-header">List of Images</div>
          <ul className="list-group list-group-flush">
            {imageInfos.map((img, index) => (
              <li className="list-group-item" key={index}>
                <p>
                  <a href={img.url}>{img.name}</a>
                </p>
                <img src={img.url} alt={img.name} height="80px" />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
