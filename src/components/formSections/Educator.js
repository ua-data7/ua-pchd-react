import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';

class Educator extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
    }
  }

  render() {

    const { t } = this.props;
   
    return (
      <>
        <p>Educators</p>

        <Form.Row className="mt-5">
          <Form.Group as={Col} md="6" sm="12">
            <Form.Label>
              {t('educator_employer')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control as="select"
                          custom
                          defaultValue=""
                          name="educator_employer">
                <option value="" disabled>Select Employer</option>
                {Object.keys(this.props.choices.educator_employer).map((key, index) => 
                  <option key={key} value={key}>
                    { this.props.language === 'es' ? this.props.choices.educator_employer[key].esp : this.props.choices.educator_employer[key].eng}
                  </option>
                )}
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6" sm="12">
            <Form.Label>
              {t('educator_employer')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control name="educator_employer_specify"/>
          </Form.Group>
        </Form.Row>

        <Form.Row className="mt-4">
          <Form.Group as={Col} md="6" sm="12">
            <Form.Label>
              {t('education_occupation')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control as="select"
                          custom
                          defaultValue=""
                          name="education_occupation">
                <option value="" disabled>Select Occupation</option>
                {Object.keys(this.props.choices.educator_occupation).map((key, index) => 
                  <option key={key} value={key}>
                    { this.props.language === 'es' ? this.props.choices.educator_occupation[key].esp : this.props.choices.educator_occupation[key].eng}
                  </option>
                )}
              </Form.Control>
          </Form.Group>
        </Form.Row>
        
        <Form.Row>
          <Form.Group as={Col} md="6" sm="12">
            <Form.Label>
              {t('education_occupation')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control name="education_occupation_specify"/>
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" className="mt-4 mb-5">
          Next
        </Button>
          
      </>

    );
  }
}

export default withTranslation()(Educator);
