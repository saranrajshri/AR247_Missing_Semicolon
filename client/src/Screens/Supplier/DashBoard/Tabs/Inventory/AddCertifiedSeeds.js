import React, { useState, useContext } from "react";

// Semantic UI
import { Form, Input, TextArea, Button, Divider } from "semantic-ui-react";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faEraser } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../../../Context/Context";

const AddCertfiedSeeds = () => {
  const [formData, setFormData] = useState({
    certificateNumber: "",
    tagNumber: "",
    expiresAt: "",
    issuedDate: ""
  });

  const { setAlert, setFullScreenLoader } = useContext(Context);
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };

  const add = () => {
    setFullScreenLoader(true);
    sleep(1000).then(() => {
      setAlert({
        isOpen: true,
        message: "Product added to inventory..",
        alertType: "positive"
      });
      setFullScreenLoader(false);
    });
  };

  return (
    <div className="p-5">
      <p className="title text-dark">Add certified seeds to inventory</p>
      {/* Row */}
      <div className="grid-container-2">
        <div className="grid-item">
          <div className="card">
            <div className="card-content" style={{ padding: 30 }}>
              <Form>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Certificate Number"
                    required
                    name="certificateNumber"
                    onChange={handleChange}
                    placeholder="Certificate Number"
                  />
                  <Form.Field
                    control={Input}
                    label="Tag Number"
                    required
                    name="tagNumber"
                    onChange={handleChange}
                    placeholder="Tag Number"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Validity From"
                    required
                    name="issuedDate"
                    onChange={handleChange}
                    placeholder="Validity From"
                  />
                  <Form.Field
                    control={Input}
                    label="Expires At"
                    required
                    name="expiresAt"
                    onChange={handleChange}
                    placeholder="Expires At"
                  />
                </Form.Group>
              </Form>
              <Divider />
              <Button>
                <FontAwesomeIcon icon={faEraser} className="icon" />
                Clear
              </Button>
              <Button primary onClick={add}>
                <FontAwesomeIcon icon={faPlusCircle} className="icon" />
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className="grid-item">
          <div className="card">
            <div className="card-content">
              <p>Upload Certificate</p>
              <input type="file" label="Upload Certificate"></input>
              <hr />
              <p>Upload Lab Report Document</p>
              <input type="file" label="Upload Lab Report Document"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCertfiedSeeds;
