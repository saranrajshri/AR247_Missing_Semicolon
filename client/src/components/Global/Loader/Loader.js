import React, { useContext } from "react";

// Semantic UI Components
import { Modal, Loader } from "semantic-ui-react";

// Context
import { Context } from "../../../Context/Context";

const Spinner = () => {
  const { isFullScreenLoaderVisible } = useContext(Context);
  return (
    <div>
      <Modal open={isFullScreenLoaderVisible} basic size="small">
        <Modal.Content>
          <Loader>Loading</Loader>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Spinner;
