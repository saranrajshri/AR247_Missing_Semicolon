import React from 'react'
import { Button, Header, Image, Modal,Icon, Step } from 'semantic-ui-react'

function DetailsModal() {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button
              basic
              color="green"
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Track Order
            </Button>}
    >
      <Modal.Header>Track Order</Modal.Header>
      <Modal.Content image>
        <Image size='medium' src='https://5.imimg.com/data5/WC/QH/MY-45792250/jute-seeds-250x250.jpg' style={{
              width: "75%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }} wrapped />
        <Modal.Description>
          <Header>Test Prodct 1</Header>
          <Step.Group style={{
              width: "65%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto"
            }} size="small">
    <Step>
      <Icon name='handshake' />
      <Step.Content>
        <Step.Title>Order Processed</Step.Title>
        <Step.Description>Your Order has been Successfully Processed</Step.Description>
      </Step.Content>
    </Step>

    <Step active>
      <Icon name='truck' />
      <Step.Content>
        <Step.Title>Dispatched</Step.Title>
        <Step.Description>Your Order is on the way...</Step.Description>
      </Step.Content>
    </Step>

    <Step disabled>
      <Icon name='info' />
      <Step.Content>
        <Step.Title>Order Received</Step.Title>
        <Step.Description>(Awaiting Confirmation)</Step.Description>

      </Step.Content>
    </Step>
  </Step.Group>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          icon='close'
          content="Close"
          labelPosition='center'
          onClick={() => setOpen(false)}
          negative
          style={{display: "block",marginLeft: "auto", marginRight: "auto"}}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default DetailsModal