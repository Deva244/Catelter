import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImg } from "../features/cat/catSlice";

export default function Upload() {
  const dispatch = useDispatch();
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", img);

    dispatch(uploadImg(formData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setImg(e.target.files[0])}
          type="file"
          accept="image/*"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
