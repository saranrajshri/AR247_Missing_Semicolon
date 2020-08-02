import React, { useState, useContext } from "react";
// Semantic UI
import { Form, Input, Button, Divider } from "semantic-ui-react";
//Actions
import { addCertifiedSeeds } from "../../../../../actions/actions";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faEraser } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../../../../../Context/Context";

const AddCertfiedSeeds = () => {
  const [formData, setFormData] = useState({
    certificateNumber: "",
    tagNumber: "",
    issuedAt: "",
    expiresAt: "",
    producerName: "",
    producerContact: "",
    producerAddress: "",
    quantity: 0
  });
  const { setAlert, setFullScreenLoader, supplierData } = useContext(Context);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setFormData({
      certificateNumber: "",
      tagNumber: "",
      issuedAt: "",
      expiresAt: "",
      producerName: "",
      producerContact: "",
      producerAddress: "",
      quantity: 0
    });
  };

  const add = () => {
    var cdata = formData;
    cdata.supplierID = supplierData._id;
    console.log("CDATA : " + cdata);
    addCertifiedSeeds(cdata)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setFullScreenLoader(false);
          setAlert({
            alertType: "positive",
            isOpen: true,
            message: "Added to Inventory"
          });
          clear();
        } else {
          setFullScreenLoader(false);
          console.log("From Else");
        }
      })
      .catch((err) => {
        setFullScreenLoader(false);
        console.log("From Catch");
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
                    label="Producer Name"
                    required
                    name="producerName"
                    onChange={handleChange}
                    placeholder="Producer Name"
                  />
                  <Form.Field
                    control={Input}
                    label="Producer Contact"
                    required
                    name="producerContact"
                    onChange={handleChange}
                    placeholder="Producer Contact"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Producer Address"
                    required
                    name="producerAddress"
                    onChange={handleChange}
                    placeholder="Producer Address"
                  />
                  <Form.Field
                    control={Input}
                    label="Quantity"
                    required
                    name="quantity"
                    onChange={handleChange}
                    placeholder="quantity"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Field
                    control={Input}
                    label="Validity From"
                    required
                    type="date"
                    name="issuedAt"
                    onChange={handleChange}
                    placeholder="Validity From"
                  />
                  <Form.Field
                    control={Input}
                    label="Expires At"
                    required
                    type="date"
                    min="2020-08-20"
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
