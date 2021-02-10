import React, { Component } from "react";
import { Button, Form, Col, Alert, InputGroup } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import { stateOptions, monthOptions, vaccineTypeOptions, vaccineLocationOptions } from "./Choices";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Formik, useField, useFormikContext } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

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
    const { t, language } = this.props;

    const vaccineInterestSchema = yup.object({
      first_name: yup
        .string()
        .required('First name is required.'),
      last_name: yup
        .string()
        .required('Last name is required.'),
      dob_month: yup
        .string()
        .required('Required.'),
      dob_date: yup
        .number('Invalid date.')
        .required('Required.')
        .nullable(true)
        .integer('Invalid date.')
        .min(1, 'Invalid date.')
        .max(31, 'Invalid date.'),
      dob_year: yup
        .number('Required.')
        .required(language === 'en' ?  'Required.' : 'Obligatorio.')
        .nullable(true)
        .integer()
        .min(1900)
        .max(2021),
      sex: yup
        .string()
        .required("Required."),
      email: yup
        .string()
        .email()
        .required('Email address is required.'),
      residential_address: yup
        .string()
        .required(),
      city: yup
        .string()
        .required(),
      state: yup
        .string()
        .required(),
      home_zip: yup
        .string()
        .required(),
      home_phone: yup
        .string()
        .required()
        .min(11, 'Must be exactly 10 digits'),
      cell_number: yup
        .string()
        .required()
        .min(11, 'Must be exactly 10 digits'),
      received_first_dose: yup
        .string()
        .required(),
      vaccine_type: yup
        .string()
        .when("received_first_dose", {
          is: 'Yes',
          then: yup.string().required()
        }),
      first_dose_date: yup
        .date()
        .nullable(true)
        .when("received_first_dose", {
          is: 'Yes',
          then: yup.date().required()
        }),
      first_dose_loc: yup
        .string()
        .when("received_first_dose", {
          is: 'Yes',
          then: yup.string().required()
        })
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
            name={props.name}
            value={props.value}
            onClick={props.onClick}
            // onChange={props.onChange}
            onBlur={props.onBlur}
            isInvalid={props.isInvalid}
            placeholder="Select Date"
          />
          <Form.Control.Feedback type="invalid">
            {props.errors.first_dose_date}
          </Form.Control.Feedback>
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
          sex: "",
          email: "",
          residential_address: "",
          city: "",
          state: "",
          home_zip: "",
          home_phone: "",
          cell_number: "",
          received_first_dose: "",
          vaccine_type: "",
          first_dose_date: null,
          first_dose_loc: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
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
                                name="dob_year"
                                placeholder="Year"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.dob_year && errors.dob_year}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.dob_year}
                  </Form.Control.Feedback>
                </Col>
                <Form.Group as={Col} md="12">
                  <Form.Text muted className="pl-1">
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
                  {Object.keys(this.props.choices.sex).map((key, index) => 
                    <Form.Check type="radio"
                                id={'sex_' + key}
                                key={key}>
                      <Form.Check.Input 
                                type="radio" 
                                name="sex"
                                value={key}
                                isInvalid={touched.sex && !!errors.sex}
                                onChange={handleChange}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.sex[key].esp : this.props.choices.sex[key].eng}
                      </Form.Check.Label>
                      { index === Object.keys(this.props.choices.sex).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.sex}
                        </Form.Control.Feedback>
                      } 
                    </Form.Check>            
                  )}
                </div>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} lg="4" md="6">
                <Form.Label>
                  {t('email')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control type="email"
                              placeholder="Enter email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.email && errors.email}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
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
                <Form.Control placeholder="1234 Main St"
                              name="residential_address"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.residential_address && errors.residential_address}>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.residential_address}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} md="6" xs="12">
                  <Form.Label>
                    {t('city')} <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control name="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.city && errors.city}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" xs="6">
                  <Form.Label>
                    {t('state')} <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control as="select"
                                placeholder="Select state"
                                name="state"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.state && errors.state}>
                    {stateOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" xs="6">
                  <Form.Label>
                    {t('zip_code')} <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control name="home_zip"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.home_zip && errors.home_zip}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.home_zip}
                  </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col}>
                <Form.Label>
                  {t('home_phone')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>

                <PhoneInput
                  country={'us'}
                  value={values.home_phone}
                  onChange={ value => setFieldValue('home_phone', value)}
                  onBlur={handleBlur}
                  countryCodeEditable={false}
                  disableDropdown={true}
                  inputProps={{
                    name: "home_phone",
                  }}
                />

                { touched.home_phone && 
                  <Form.Text className="pc-color-text-secondary-dark">
                    {errors.home_phone}
                  </Form.Text>
                }

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
                  value={values.cell_number}
                  onChange={ value => setFieldValue('cell_number', value)}
                  onBlur={handleBlur}
                  countryCodeEditable={false}
                  disableDropdown={true}
                  inputProps={{
                    name: "cell_number",
                  }}
                />

                { touched.cell_number && 
                  <Form.Text className="pc-color-text-secondary-dark">
                    {errors.cell_number}
                  </Form.Text>
                }

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
                    name="received_first_dose"
                    id="received_first_dose_yes"
                    type="radio"
                    label="Yes"
                    value="Yes"
                    isInvalid={touched.received_first_dose && !!errors.received_first_dose}
                    onChange={handleChange}
                  />
                  <Form.Check
                    name="received_first_dose"
                    id="received_first_dose_no"
                    type="radio"
                    label="No"
                    value="No"
                    isInvalid={touched.received_first_dose && !!errors.received_first_dose}
                    onChange={handleChange}
                    feedback={errors.received_first_dose}
                  />
                </div>  
              </Form.Group>
            </Form.Row>

            { values.received_first_dose === 'Yes' && 
              <>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>
                      {t('which_received')} <span className="pc-color-text-secondary-dark">*</span>
                    </Form.Label>
                    <div className="mb-3">

                      {vaccineTypeOptions.map((option, index) => 
                        <Form.Check type="radio"
                                    id={'vaccine_type_' + option.display}>
                          <Form.Check.Input 
                                    type="radio" 
                                    name="vaccine_type"
                                    value={option.value}
                                    isInvalid={touched.vaccine_type && !!errors.vaccine_type}
                                    onChange={handleChange}/>
                          <Form.Check.Label>
                            {option.display}
                          </Form.Check.Label>
                          { index === vaccineTypeOptions.length - 1 && 
                            <Form.Control.Feedback type="invalid">
                              {errors.vaccine_type}
                            </Form.Control.Feedback>
                          } 
                        </Form.Check>            
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
                      name="first_dose_date"
                      selected={values.first_dose_date}
                      onChange={ date => setFieldValue('first_dose_date', date)}
                      maxDate={new Date()}
                      onBlur={handleBlur}
                      customInput={
                        <CustomDatepickerInput
                          isInvalid={touched.first_dose_date && errors.first_dose_date}
                          errors={errors}
                        />
                      }
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>
                      {t('where_received')} <span className="pc-color-text-secondary-dark">*</span>
                    </Form.Label>
                    <div className="mb-3">
                      {Object.keys(this.props.choices.locations).map((key, index) => 
                        <Form.Check type="radio"
                                    id={'first_dose_loc_' + key}
                                    key={key}>
                          <Form.Check.Input 
                                    type="radio" 
                                    name="first_dose_loc"
                                    value={key}
                                    isInvalid={touched.first_dose_loc && !!errors.first_dose_loc}
                                    onChange={handleChange}/>
                          <Form.Check.Label>
                            { this.props.language === 'es' ? this.props.choices.locations[key].esp : this.props.choices.locations[key].eng}
                          </Form.Check.Label> 
                          { index === Object.keys(this.props.choices.locations).length - 1 && 
                            <Form.Control.Feedback type="invalid">
                              {errors.first_dose_loc}
                            </Form.Control.Feedback>
                          } 
                        </Form.Check>            
                      )}
                    </div>
                  </Form.Group>
                </Form.Row>
              </>
            }

      
            <Button variant="primary" type="submit" className="mt-5">
            Next
            </Button>

            <FormikErrorFocus />
          </Form>
        )}
      </Formik>
    );
  }
}

export default withTranslation()(Start);
