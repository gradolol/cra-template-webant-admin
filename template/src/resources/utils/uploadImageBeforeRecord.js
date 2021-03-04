import axios from "axios";
import { textRegEx } from "../../constants";

const uploadImageBeforeRecord = async (data) => {
  ["description", "title", "text", "speaker"].forEach((attr) => {
    if (data[attr]) data[attr] = data[attr].trim().replace(textRegEx, " ");
  });
  if (data.image) {
    //Если фотография уже существует в записи (при редактировании, просто назначаем свойству image ссылку (IRI) на файл)
    if (data.image.id) {
      data.image = `/api/files/${data.image.id}`;
      return data;
    }
    //Если файл загружаем новый, то следует сначала отправить его на сервер, получив ссылку на него (IRI)
    if (data.image?.rawFile) {
      const fd = new FormData();
      fd.set("file", data.image.rawFile);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_PATH}/api/files`,
          fd,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        data.image = `/api/files/${response.data.id}`;
        return data;
      } catch (err) {
        Promise.reject(err);
      }
    }
  } else {
    return data;
  }
};

export default uploadImageBeforeRecord;
