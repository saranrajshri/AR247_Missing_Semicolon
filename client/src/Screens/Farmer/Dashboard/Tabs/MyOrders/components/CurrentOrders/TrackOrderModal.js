import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  resetContainer: {
    padding: theme.spacing(3)
  },
  stepTime: {
    fontSize: "10px",
    color: "#777777",
    paddingLeft: "10px",
    fontStyle: "italic"
  }
}));

const DetailsModal = () => {
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(2);
  const classes = useStyles();
  const [steps, setSteps] = useState([
    { l: "Nellore", t: "08.00PM 01-08-2020" },
    { l: "Naidupeta", t: "08.30PM 01-08-2020" },
    { l: "Tiruvallur", t: "09.05PM 01-08-2020" },
    { l: "Chennai", t: "10.43PM 01-08-2020" }
  ]);
  const { t, i18n } = useTranslation();
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          fluid
          color="blue"
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {t("trackOrder")}
        </Button>
      }
    >
      <Modal.Header>{t("trackOrder")}</Modal.Header>
      <Modal.Content>
        <p className="ship-label">order details</p>
        <div className="ship-info">
          <p>
            Name: <span>Test product</span>
          </p>
          <p>
            Price:{" "}
            <span>
              <FontAwesomeIcon icon={faRupeeSign} /> 720
            </span>
          </p>
          <p>
            Quantity: <span>6 kg</span>
          </p>
        </div>
        <p className="ship-label">order details</p>
        <div className="ship-info">
          <p>
            Supplier: <span>Test agency</span>
          </p>
          <p>
            Contact: <span>8888888888</span>
          </p>
        </div>
        <p className="ship-label">order details</p>
        <div className="ship-info">
          <p>
            Driver: <span>Test driver</span>
          </p>
          <p>
            Contact: <span>7777777777</span>
          </p>
        </div>
        <p className="ship-label">Order status</p>

        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.l}>
              <StepLabel>
                {step.l}
                {(index === 0 || index === 1) && (
                  <span className={classes.stepTime}>{step.t}</span>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="ship-info">
          <p>
            EST. TIME: <span>Will reach in 1 hr</span>
          </p>
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon="close"
          content={t("close")}
          labelPosition="center"
          onClick={() => setOpen(false)}
          negative
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DetailsModal;
