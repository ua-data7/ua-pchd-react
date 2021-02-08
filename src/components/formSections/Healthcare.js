import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { educatorEmployerOptions } from "./Choices";

import { Formik } from 'formik';

class Healthcare extends Component {

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

        <p>Healthcare</p>

        <Form.Row>
          <Form.Group as={Col} md="4">
            <Form.Label>
              {t('hcw_occupation')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control as="select"
                            custom
                            defaultValue=""
                            name="hcw_occupation">
                <option value="" disabled>Select Occupation</option>
                {educatorEmployerOptions.map((option) => <option key={option.value} value={option.value}>{this.props.language === 'en' ? option.english : option.spanish }</option>)}
              </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="4">
            <Form.Label>
              {t('other_hcw_occupation')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control name="other_hcw_occupation"/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>
            {t('ltc')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <div className="mb-3">
              <Form.Check
                name="ltc"
                id="Yes"
                type="radio"
                label={t('yes_no_answer_1')}
                value="Yes"
              />
              <Form.Check
                name="ltc"
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
              {t('hcw_employer')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control name="hcw_employer_specify"/>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="4">
            <Form.Label>
              {t('hcw_employer_address')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control />
          </Form.Group>
        </Form.Row>
        
        

        <Button variant="primary" type="submit" className="mt-4 mb-5">
          Next
        </Button>
          
      </>

    );
  }
}

export default withTranslation()(Healthcare);
