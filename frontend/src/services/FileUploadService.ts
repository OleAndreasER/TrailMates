import http from "../http-common";

const upload = (file: File): Promise<any> => {
  let formData = new FormData();

  formData.append("file", file);

  return http.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getFiles = () : Promise<any> => {
  return http.get("/files");
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService;