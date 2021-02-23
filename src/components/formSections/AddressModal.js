import { Modal, Button } from "react-bootstrap";

export function AddressModal(props) {



  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Select your address:
          { props.addressCandidates.length === 0 && 
            <p>No matches were found for your address. Please confirm the address you entered is correct or update your address.</p>
          }
          {props.addressCandidates.length === 1 &&
            <>
            <p>The following match was found for your address. Is this correct?</p>
            {props.addressCandidates[0].address}
            </>
          }
          {props.addressCandidates.length > 1 && 
            <>
            <p>The following matches were found for your address. Please select the correct address.</p>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
  
