import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

class Start extends Component {

  render() {
    const { t } = this.props;
    return (
      <> 

        <Form>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>
                {t('first_name')}
              </Form.Label>
              <Form.Control placeholder={t('first_name')}/>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                {t('last_name')}
              </Form.Label>
              <Form.Control placeholder={t('last_name')}/>
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
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
              <Form.Control as="select" defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
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
        </Form>
        
      </>

    );
  }
}

export default withTranslation()(Start);
