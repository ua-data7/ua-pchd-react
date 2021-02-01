import React, { Component } from "react";
import { Button, Form, Col, Alert, InputGroup } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import { stateOptions, monthOptions, vaccineTypeOptions, vaccineLocationOptions } from "./Choices";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CalendarEvent } from 'react-bootstrap-icons';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Formik } from 'formik';

class Start extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }

  }

  toggleSSN() {
    var x = document.getElementById("ssn");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
  }
  render() {
    const { t } = this.props;
    
    const CustomDatepickerInput = ({ value, onClick }) => (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
          <CalendarEvent onClick={onClick}></CalendarEvent>
          </InputGroup.Text>
          
        </InputGroup.Prepend>
        <Form.Control
          value={value} onClick={onClick} placeholder="Select Date"
        />
      </InputGroup>

    );
   
    return (
      <>
        <Form.Row>
          <Form.Group as={Col} md="4" xs="12">
            <Form.Label>
              {t('first_name')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control placeholder={t('first_name')}/>
          </Form.Group>

          <Form.Group as={Col} md="4" xs="12">
            <Form.Label>
              {t('last_name')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control placeholder={t('last_name')}/>
          </Form.Group>
        </Form.Row>
        
        <Form.Label>
          {t('dob')} <span className="pc-color-text-secondary-dark">*</span>
        </Form.Label>
        
        <Form.Row>   
            <Col md="2" xs="6">
              <Form.Control as="select" custom placeholder="Month" defaultValue="">
                <option value="" disabled>Month</option>
                {monthOptions.map((option) => <option key={option.value} value={option.value}>{option.display}</option>)}
              </Form.Control>
            </Col>

            <Col md="1" xs="3">
              <Form.Control type="number"
                            min="1"
                            max="31"
                            placeholder="Date">
              </Form.Control>
            </Col>

            <Col md="1" xs="3">
              <Form.Control type="number"
                            min="1900"
                            max="2021"
                            placeholder="Year">
              </Form.Control>
            </Col>
            <Form.Group as={Col} md="12">
              <Form.Text id="passwordHelpBlock" muted className="pl-1">
                {t('dob_help_text')}
              </Form.Text>
            </Form.Group>
        </Form.Row>

        <Form.Row>
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
          <Form.Group as={Col} md="4">
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
            <Form.Group as={Col}>
              <Form.Label>
                City <span className="pc-color-text-secondary-dark">*</span>
              </Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>
                State <span className="pc-color-text-secondary-dark">*</span>
              </Form.Label>
              <Form.Control as="select" placeholder="Select state">
                {stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
            <Form.Label>
              Zip <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <Form.Control />
            </Form.Group>
        </Form.Row>

        <Form.Row>
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

        <Form.Row>
          <Form.Group as={Col} md="4">
            <Form.Label>
              Last 4 digits of SSN (Optional)
            </Form.Label>
            <Form.Control type="password" id="ssn" minLength="4" maxLength="4" pattern="[1-9]{4}"/>
            <input type="checkbox" onClick={this.toggleSSN}/> Show SSN
          </Form.Group>
        </Form.Row>

        <Form.Row>
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
        
        <Form.Label>
            Date you received your first dose (please double check the date entered is correct):
          </Form.Label>
        <Form.Row>
          <Form.Group>

            <DatePicker
              selected={this.props.exempt_end_date}
              onChange={date => this.props.setEndDate(date)}
              // minDate={new Date()}
              placeholderText="Click to select"
              customInput={<CustomDatepickerInput />}
            />
  
            {/* <SingleDatePicker
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              id="your_unique_id" // PropTypes.string.isRequired,
              showDefaultInputIcon={true}
            /> */}
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
        
        
        <Button variant="primary" type="submit" className="mt-5">
            Submit
        </Button>
      </>

    );
  }
}

export default withTranslation()(Start);
