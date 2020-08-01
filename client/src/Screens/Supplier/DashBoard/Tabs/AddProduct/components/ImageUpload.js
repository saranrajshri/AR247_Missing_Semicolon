import React, {
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";

// Semantic UI
import { Button, Form } from "semantic-ui-react";

// Firebase storage
import { storage } from "../../../../../../firebase/firebase";

// Context
import { Context } from "../../../../../../Context/Context";

const ImageUpload = forwardRef((props, ref) => {
  const [file, setFile] = useState("");
  const filePickerRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const { setFullScreenLoader } = useContext(Context);

  //   Handle Image Change
  const _handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    if (file !== undefined) {
      reader.onloadend = () => {
        setFile(file);
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const _handleSubmit = (e) => {
    e.preventDefault();

    const uploadTask = storage.ref(`images/${file.name}`).put(file);

    setFullScreenLoader(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progrss function ....
      },
      (error) => {
        // error function ....
        console.log(error);
      },
      () => {
        // complete function ....
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            // setImageURL(url);

            // call the submit function in the props
            props.submit(url);
            setFullScreenLoader(false);
          });
      }
    );
  };

  let $imagePreview = null;
  if (imagePreview) {
    $imagePreview = (
      <img
        src={imagePreview}
        className="imagePreview"
        alt="preview"
        style={{ width: "50%", marginTop: 20 }}
      />
    );
  }

  const _clearState = () => {
    setFile("");
    setImagePreview("");
  };

  useImperativeHandle(ref, () => {
    return {
      _handleSubmit: _handleSubmit,
      _clearState: _clearState,
    };
  });

  const handleClick = (e) => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <h5>Upload Image</h5>
      <Form.Input onSubmit={(e) => _handleSubmit(e)}>
        <Button
          content="Choose File"
          labelPosition="left"
          icon="file"
          onClick={(e) => handleClick(e)}
        />
        <input
          className="fileInput"
          type="file"
          hidden
          ref={filePickerRef}
          onChange={(e) => _handleImageChange(e)}
        />
      </Form.Input>
      <div className="imgPreview">{$imagePreview}</div>
      <div className="mt-4">
        <div className="d-flex justify-content-end"></div>
      </div>
    </div>
  );
});

export default ImageUpload;
