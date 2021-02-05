import React, { Component } from "react";
import { Button, Form, Col, Alert, InputGroup } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import { stateOptions, monthOptions, vaccineTypeOptions, vaccineLocationOptions } from "./Choices";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarEvent } from 'react-bootstrap-icons';

import { Formik } from 'formik';

class Screening extends Component {

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

        <Form.Row className="mt-2">
          <Form.Group as={Col}>
            <Form.Label>
              {t('sex')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <div className="mb-3">
              <Form.Check
                name="sex"
                id="Male"
                type="radio"
                label={t('sex_answer_1')}
                value="Male"
              />

              <Form.Check
                name="sex"
                id="Female"
                type="radio"
                label={t('sex_answer_2')}
                value="Female"
              />
            </div>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} lg="4" md="6">
            <Form.Label>{t('email')}</Form.Label>
            <Form.Control type="email" placeholder="Enter email"/>
            <Form.Text className="text-muted">
              {t('email_help_text')}
            </Form.Text>
          </Form.Group>
        </Form.Row>
        

        <h5>Address</h5>

        <Alert variant="info" className="mt-4">
          {t('address_instructions')}
        </Alert>

        <Form.Group>
            <Form.Label>
              Address <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control placeholder="1234 Main St" />
        </Form.Group>

        <Form.Row>
            <Form.Group as={Col} md="6" xs="12">
              <Form.Label>
                City <span className="pc-color-text-secondary-dark">*</span>
              </Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} md="3" xs="6">
              <Form.Label>
                State <span className="pc-color-text-secondary-dark">*</span>
              </Form.Label>
              <Form.Control as="select" placeholder="Select state">
                {stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} md="3" xs="6">
            <Form.Label>
              Zip <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control />
            </Form.Group>
        </Form.Row>

        <Form.Row className="mt-3">
          <Form.Group as={Col}>
            <Form.Label>
              {t('home_phone')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <PhoneInput
              country={'us'}
              value={this.props.phoneNumber}
              onChange={this.props.setPhoneNumber}
              countryCodeEditable={false}
              disableDropdown={true}
            />
            <Form.Text muted>
              {t('home_number_help_text')}
            </Form.Text>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>
              {t('cell_number')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <PhoneInput
              country={'us'}
              value={this.props.phoneNumber}
              onChange={this.props.setPhoneNumber}
              countryCodeEditable={false}
              disableDropdown={true}
            />
            <Form.Text muted>
              {t('cell_number_help_text')}
            </Form.Text>
          </Form.Group>
        </Form.Row>

        <Form.Row className="mt-3">
          <Form.Group as={Col}>
            <Form.Label>
            Have you already received your first COVID-19 vaccine dose? <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Text>Select <b>Yes</b> if you have already gotten your first dose and need to schedule a second dose.</Form.Text>
            <Form.Text>Select <b>No</b> if you have an appointment but have not yet received the vaccine, or if you have not otherwise received a dose of the COVID-19 vaccine. </Form.Text>
            <div className="mb-3 mt-3">
              <Form.Check
                name="sex"
                id="Yes"
                type="radio"
                label="Yes"
                value="Yes"
              />
              <Form.Check
                name="sex"
                id="No"
                type="radio"
                label="No"
                value="No"
              />
            </div>  
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>
              Which vaccine did you receive? <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <div className="mb-3">
              {vaccineTypeOptions.map((option) => 
                <Form.Check
                  key={option.display}
                  name="vaccine_type"
                  id={option.display}
                  type="radio"
                  label={option.display}
                  value={option.display}
                />            
              )}
            </div>
          </Form.Group>
        </Form.Row>
        

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>
              Where did you receive your first COVID vaccine? <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <div className="mb-3">
              {vaccineLocationOptions.map((option) => 
                <Form.Check
                  key={option.display}
                  name="vaccine_type"
                  id={option.display}
                  type="radio"
                  label={option.display}
                  value={option.display}
                />            
              )}
            </div>
          </Form.Group>
        </Form.Row>

        
        
        
        
      </>

    );
  }
}

export default withTranslation()(Screening);
