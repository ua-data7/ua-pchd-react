import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ArrowRight } from 'react-bootstrap-icons';

export function AddressModal(props) {

  const [selectedAddress, setSelectedAddress] = useState([]);

  const testAddresses = [
    { 
      address: "1321 E Lester St, Tucson, Arizona, 85719",
      attributes: {ShortLabel: "1321 E Lester St", City: "Tucson", RegionAbbr: "AZ", Postal: "85719"}
    },
    { 
      address: "1321 E Lester Road, Tucson, Arizona, 85725",
      attributes: {ShortLabel: "1321 E Lester Road", City: "Tucson", RegionAbbr: "AZ", Postal: "85725"}
    },
  ]

  const { addressCandidates } = props;

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Verify Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { addressCandidates.length === 0 && 
            <p>No matches were found for your address. Please confirm the address you entered is correct or update your address.</p>
          }
          {addressCandidates.length >= 1 &&
            <>

            {addressCandidates.length === 1 && <p>The following match was found for your address. Is this correct?</p>}

            {addressCandidates.length > 1 && <p>The following matches were found for your address. Please select the correct address.</p>}
            {addressCandidates.map(function(item, key) {
              return (
                <>
                  <Form.Check type="radio"
                              id={'address_' + key}
                              key={key}>
                    <Form.Check.Input 
                              type="radio" 
                              name="address"
                              value={key}
                              onChange={(e) => setSelectedAddress(e.target.value)}
                              />
                    <Form.Check.Label>
                      <pre className="word-wrap">{ item.address }</pre>
                    </Form.Check.Label>
                  </Form.Check>
                </>
              );
            })}
            <Form.Check type="radio"
                        id={'keep_address'}>
              <Form.Check.Input 
                        type="radio" 
                        name="address"
                        value={-1}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                        />
              <Form.Check.Label>
                Keep address as entered (may be invalid): 
                <pre className="word-wrap">
                  { props.start.residential_address}, {props.start.city}, {props.start.state}, {props.start.zip}
                </pre>
              </Form.Check.Label>
            </Form.Check>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.handleClose()}>
            Go Back
          </Button>
          <Button variant="primary" onClick={() => props.continueAddressModal(addressCandidates[selectedAddress])}>
            Continue <ArrowRight></ArrowRight>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
  
