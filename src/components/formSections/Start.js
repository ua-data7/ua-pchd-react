import React, { Component } from "react";
import { Button, Form, Col, Alert } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import { stateOptions } from "./Choices"

class Start extends Component {

  render() {
    const { t } = this.props;
    return (
      <> 

        <Form.Row>
          <Form.Group as={Col} md="4" xs="12">
            <Form.Label>
              {t('first_name')}
            </Form.Label>
            <Form.Control placeholder={t('first_name')}/>
          </Form.Group>

          <Form.Group as={Col} md="4" xs="12">
            <Form.Label>
              {t('last_name')}
            </Form.Label>
            <Form.Control placeholder={t('last_name')}/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="4" xs="12">
            <Form.Label>
              {t('dob')}
            </Form.Label>
            <Form.Control placeholder={t('dob')}/>
          </Form.Group>
        </Form.Row>

        <h5>Address</h5>

        <Alert variant="info" className="mt-4">
          {t('address_instructions')}
        </Alert>

        <Form.Group controlId="formGridAddress1" >
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" placeholder="Select state">
                {stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control />
            </Form.Group>
        </Form.Row>

        <Form.Group id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
      </>

    );
  }
}

export default withTranslation()(Start);
