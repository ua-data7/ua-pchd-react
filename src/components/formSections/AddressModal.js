import React, { useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { ArrowRight, Check } from 'react-bootstrap-icons';

export function AddressModal(props) {

  const [selectedAddress, setSelectedAddress] = useState([]);

  // const testAddresses = [
  //   { 
  //     address: "1234 E Main St, Tucson, Arizona, 85719",
  //     attributes: {ShortLabel: "1234 E Main St", City: "Tucson", RegionAbbr: "AZ", Postal: "85719"}
  //   },
  //   { 
  //     address: "1234 E Main Road, Tucson, Arizona, 85725",
  //     attributes: {ShortLabel: "1234 E Main Road", City: "Tucson", RegionAbbr: "AZ", Postal: "85725"}
  //   },
  // ]

  // const addressCandidates = testAddresses;

  const { addressCandidates } = props;

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        
        <Modal.Header closeButton>
          <Modal.Title>Verify Address</Modal.Title>
        </Modal.Header>
        
        { addressCandidates.length === 0 &&
        <>
          <Modal.Body>
          <p>No matches were found for your address: </p>
          
          <pre className="ml-5">
            { props.start.residential_address}<br></br>
            {props.start.city}, {props.start.state}, {props.start.zip}
          </pre>
          
          <p>
            Please confirm the address you entered is correct or <b>Go Back</b> to update your address.
          </p>
  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
                    onClick={() => props.handleClose()}>
              Go Back
            </Button>
            <Button variant="success"
                    onClick={() => props.continueAddressModal(addressCandidates[selectedAddress])}>
              Address is Correct <Check></Check>
            </Button>
          </Modal.Footer>
        </>
        }

        {addressCandidates.length === 1 &&
          <>
            <Modal.Body>
              <p>The following match was found for your address.</p>

              <Form.Check type="radio"
                          id='address_0'>
                <Form.Check.Input 
                          type="radio" 
                          name="address"
                          value={0}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          />
                <Form.Check.Label>
                  Use suggested address
                  <Badge variant="success" pill className="ml-1">
                    Recommended
                  </Badge>
                  <pre>
                    { addressCandidates[0].attributes.ShortLabel }<br></br>
                    { addressCandidates[0].attributes.City }, { addressCandidates[0].attributes.RegionAbbr }, { addressCandidates[0].attributes.Postal }
                  </pre>
                </Form.Check.Label>
              </Form.Check>
                
              <Form.Check type="radio"
                          id='keep_address'>
                <Form.Check.Input 
                          type="radio" 
                          name="address"
                          value={-1}
                          onChange={(e) => setSelectedAddress(e.target.value)}/>
                <Form.Check.Label>
                  Keep address as entered
                  <Badge variant="warning" pill className="ml-1">
                    Address may be invalid
                  </Badge>
                  <pre>
                    { props.start.residential_address}<br></br>{props.start.city}, {props.start.state}, {props.start.zip}
                  </pre>
                </Form.Check.Label>
              </Form.Check>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => props.handleClose()}>
                Go Back
              </Button>
              <Button variant="primary" onClick={() => props.continueAddressModal(addressCandidates[selectedAddress])}>
                Continue <ArrowRight></ArrowRight>
              </Button>
            </Modal.Footer>
          </>
        }

        {addressCandidates.length > 1 &&
          <>
            <Modal.Body>

              <p>The following matches were found for your address. Please select the correct address.</p>
              
              {addressCandidates.map(function(item, key) {
                return (
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
                    <pre>
                      { item.attributes.ShortLabel }<br></br>
                      { item.attributes.City }, { item.attributes.RegionAbbr }, { item.attributes.Postal }
                    </pre>
                    </Form.Check.Label>
                  </Form.Check>
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
                  Keep address as entered
                  <Badge variant="warning" pill className="ml-1">
                    Address may be invalid
                  </Badge> 
                  <pre>
                    { props.start.residential_address}<br></br>
                    {props.start.city}, {props.start.state}, {props.start.zip}
                  </pre>
                </Form.Check.Label>
              </Form.Check>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary"
                      onClick={() => props.handleClose()}>
                Go Back
              </Button>
              <Button variant="primary"
                      onClick={() => props.continueAddressModal(addressCandidates[selectedAddress])}>
                Continue <ArrowRight></ArrowRight>
              </Button>
            </Modal.Footer>
          </>
        }

      </Modal>
    </>
  );
}
  
