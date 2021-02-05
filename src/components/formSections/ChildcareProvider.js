import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { educatorEmployerOptions } from "./Choices";

import { Formik } from 'formik';

class Education extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
    }
  }

  render() {

    const { t } = this.props;
   
    return (
      <>
        <Button className="pc-color-primary-alt-darker"
                onClick={() => this.props.changeLanguage('en')}>
          English
        </Button>
        <Button className="pc-color-primary-alt-darkest ml-2"
                onClick={() => this.props.changeLanguage('es')}>
          Español
        </Button>
        <h4>
          {t('form_title')}
        </h4>

        <p>Childcare Provider</p>

        <Form.Row>
          <Form.Group as={Col} md="4">
            <Form.Label>
              {t('childcare_employer')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control name="childcare_employer"/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>
            {t('childcare_license')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <div className="mb-3">
              <Form.Check
                name="childcare_license"
                id="Yes"
                type="radio"
                label={t('yes_no_answer_1')}
                value="Yes"
              />
              <Form.Check
                name="childcare_license"
                id="No"
                type="radio"
                label={t('yes_no_answer_0')}
                value="No"
              />
            </div>  
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="4">
            <Form.Label>
              {t('childcare_occupation')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control name="childcare_occupation"/>
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit" className="mt-4 mb-5">
          Next
        </Button>
          
      </>

    );
  }
}

export default withTranslation()(Education);
