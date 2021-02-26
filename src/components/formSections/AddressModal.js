import React, { useState } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import { ArrowRight, Check } from 'react-bootstrap-icons';
import { withTranslation } from 'react-i18next';

function AddressModal(props) {

  const { t, language } = props;
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
          <Modal.Title>{t('verify_address')}</Modal.Title>
        </Modal.Header>
        
        { addressCandidates.length === 0 &&
        <>
          <Modal.Body>
          <p>{t('no_address_matches')}:</p>
          
          <pre className="ml-5">
            { props.start.residential_address}<br></br>
            {props.start.city}, {props.start.state}, {props.start.zip}
          </pre>
          
          <p>
            {t('confirm_address')}
          </p>
  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
                    onClick={() => props.handleClose()}>
              {t('go_back')}
            </Button>
            <Button variant="success"
                    onClick={() => props.continueAddressModal(addressCandidates[selectedAddress])}>
              {t('address_correct')} <Check></Check>
            </Button>
          </Modal.Footer>
        </>
        }

        {addressCandidates.length === 1 &&
          <>
            <Modal.Body>
              <p>{t('one_address_match')}:</p>

              <Form.Check type="radio"
                          id='address_0'>
                <Form.Check.Input 
                          type="radio" 
                          name="address"
                          value={0}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          />
                <Form.Check.Label>
                  {t('use_suggested_address')}
                  <Badge variant="success" pill className="ml-1">
                    {t('recommended')}
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
                  {t('use_entered_address')}
                  <Badge variant="warning" pill className="ml-1">
                    {t('address_invalid')}
                  </Badge>
                  <pre>
                    { props.start.residential_address}<br></br>{props.start.city}, {props.start.state}, {props.start.zip}
                  </pre>
                </Form.Check.Label>
              </Form.Check>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => props.handleClose()}>
                {t('go_back')}
              </Button>
              <Button variant="primary" onClick={() => props.continueAddressModal(addressCandidates[selectedAddress])}>
                {t('Continue')} <ArrowRight></ArrowRight>
              </Button>
            </Modal.Footer>
          </>
        }

        {addressCandidates.length > 1 &&
          <>
            <Modal.Body>

              <p>{t('multiple_address_matches')}:</p>
              
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
                  {t('use_entered_address')}
                  <Badge variant="warning" pill className="ml-1">
                    {t('address_invalid')}
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
                {t('go_back')}
              </Button>
              <Button variant="primary"
                      onClick={() => props.continueAddressModal(addressCandidates[selectedAddress])}>
                {t('Continue')} <ArrowRight></ArrowRight>
              </Button>
            </Modal.Footer>
          </>
        }

      </Modal>
    </>
  );
}
  
export default withTranslation()(AddressModal);