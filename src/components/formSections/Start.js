import React, { Component } from "react";
import { Button, Form, Col, Alert, InputGroup } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import { stateOptions, monthOptions, vaccineTypeOptions, vaccineLocationOptions } from "./Choices";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Formik } from 'formik';
import * as yup from 'yup';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarEvent } from 'react-bootstrap-icons';

class Start extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
    
    }
  }

  render() {
    const { t } = this.props;

    const vaccineInterestSchema = yup.object({
      first_name: yup.string().required('First name is required.'),
      last_name: yup.string().required('Last name is required.'),
      // dob_month: yup.string().required('Required.'),
      // dob_date: yup.number('Required.').required('Required.').nullable(true).integer().min(1).max(31),
      // dob_year: yup.number('Required.').required('Required.').integer().min(1900).max(2021),
      // sex: yup.string().required(),
      // email: yup.string().email().required(),
      // street_address: yup.string().required(),
      // city: yup.string().required(),
      // state: yup.string().required(),
      // zip: yup.string().required(),
  
    });

    const CustomDatepickerInput = React.forwardRef((props, ref) => {
      return (
        <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
          <CalendarEvent onClick={props.onClick}></CalendarEvent>
          </InputGroup.Text>
          
        </InputGroup.Prepend>
        <Form.Control
          value={props.value} onClick={props.onClick} onChange={this.props.handleChange} placeholder="Select Date"
        />
      </InputGroup>
      );
    });
  
   
    return (
      <Formik
        validationSchema={vaccineInterestSchema}
        onSubmit={this.props.handleStartSubmit}
        initialValues={{
          first_name: "",
          last_name: "",
          dob_month: "",
          dob_date: null,
          dob_year: null,
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (

          <Form className="pt-4" noValidate onSubmit={handleSubmit}>
            <p>
              {t('form_instructions')}
            </p>

            <p>
              {t('form_disclaimer')}
            </p>
            <Form.Row>
              <Form.Group as={Col} md="4" sm="6" xs="12">
                <Form.Label>
                  {t('first_name')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control placeholder={t('first_name')}
                              name="first_name"
                              onChange={handleChange}
                              value={values.first_name}
                              // isValid={this.props.touched.first_name && !this.props.errors.first_name}
                              onBlur={handleBlur}
                              isInvalid={touched.first_name && errors.first_name}/>
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" sm="6" xs="12">
                <Form.Label>
                  {t('last_name')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control placeholder={t('last_name')}
                              name="last_name"
                              onChange={handleChange}
                              value={values.last_name}
                              // isValid={this.props.touched.last_name && !this.props.errors.last_name}
                              onBlur={handleBlur}
                              isInvalid={touched.last_name && errors.last_name}/>
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            
            <Form.Label>
              {t('dob')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            
            <Form.Row>   
                <Col lg="4" md="4" sm="6" xs="6">
                  <Form.Control as="select"
                                custom
                                placeholder="Month"
                                defaultValue=""
                                name="dob_month"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.dob_month && errors.dob_month}
                                >
                    <option value="" disabled>Month</option>
                    {monthOptions.map((option) => <option key={option.value} value={option.value}>{option.display}</option>)}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.dob_month}
                  </Form.Control.Feedback>
                </Col>

                <Col lg="2" md="2" sm="3" xs="3">
                  <Form.Control type="number"
                                min="1"
                                max="31"
                                placeholder="Date"
                                name="dob_date"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.dob_date && errors.dob_date}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.dob_date}
                  </Form.Control.Feedback>
                </Col>

                <Col lg="2" md="2" sm="3" xs="3">
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
            

            <h5>{t('Address')}</h5>

            <Alert variant="info" className="mt-4">
              {t('address_instructions')}
            </Alert>

            <Form.Group>
                <Form.Label>
                  {t('local_street_address')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} md="6" xs="12">
                  <Form.Label>
                    {t('city')} <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} md="3" xs="6">
                  <Form.Label>
                    {t('state')} <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control as="select" placeholder="Select state">
                    {stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} md="3" xs="6">
                  <Form.Label>
                    {t('zip_code')} <span className="pc-color-text-secondary-dark">*</span>
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
                  {t('home_phone_help_text')}
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
                  {t('cell_phone_help_text')}
                </Form.Text>
              </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col}>
                <Form.Label>
                {t('already_recieved')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Text>{t('already_received_yes_help_text')}</Form.Text>
                <Form.Text>{t('already_received_no_help_text')}</Form.Text>
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
                  {t('which_received')} <span className="pc-color-text-secondary-dark">*</span>
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
            
            <Form.Label>
              {t('date_received')}
            </Form.Label>
            <Form.Row>
              <Form.Group>
                <DatePicker
                  selected={this.props.vaccine_date}
                  onChange={date => this.props.setDate('vaccine_date', date)}
                  maxDate={new Date()}
                  placeholderText="Click to select"
                  customInput={<CustomDatepickerInput />}
                />
      
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>
                  {t('where_received')} <span className="pc-color-text-secondary-dark">*</span>
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

      
            <Button variant="primary" type="submit" className="mt-5">
            Next
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withTranslation()(Start);
