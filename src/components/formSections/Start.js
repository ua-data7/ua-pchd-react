import React, { Component, ref } from "react";
import { Button, Form, Col, Alert, InputGroup } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import { stateOptions, monthOptions, vaccineTypeOptions } from "./Choices";
import moment from 'moment';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarEvent } from 'react-bootstrap-icons';


const BirthdayCheck = () => {

  const {values, setFieldValue, setStatus} = useFormikContext();
  
  React.useEffect(() => {

      if (values && values.dob_month && values.dob_date && values.dob_year) {
        
        var date = moment({ 
          year: values.dob_year,
          month: values.dob_month,
          date: values.dob_date
        });

        if (date.isValid()) {
          var age = moment().diff(date, 'years');
          if (age < 16) {
            setStatus({dob_valid: 'Must be 16 to register!'});
          } else if (age > 120) {
            setStatus({dob_valid: 'Double check dob.'});
          } else {
            setFieldValue('age',  age);
            setFieldValue('dob',  date);  
            setStatus({dob_valid: ''}); 
          }  
        } else {
          setStatus({dob_valid: 'Invalid!'});
          setFieldValue('dob', null);
        }
        
      }
  }, [values.dob_month, values.dob_date, values.dob_year]);

  return null;
};




function Start(props) {

    const { t, language } = props;

    const requiredMessage = (language === 'en' ?  'Required.' : 'Obligatorio.');

    const vaccineInterestSchema = yup.object({
      first_name: yup
        .string()
        .required(requiredMessage),
      last_name: yup
        .string()
        .required(requiredMessage),
      dob_month: yup
        .string()
        .required(requiredMessage),
      dob_date: yup
        .number('Invalid date.')
        .required(requiredMessage)
        .nullable(true)
        .integer('Invalid date.')
        .min(1, 'Invalid date.')
        .max(31, 'Invalid date.'),
      dob_year: yup
        .number('Required.')
        .required(requiredMessage)
        .nullable(true)
        .integer()
        .min(1900, '')
        .max(2021, ''), 
      dob: yup
        .date()
        .nullable()
        .required(),
      sex: yup
        .string()
        .required(requiredMessage),
      email: yup
        .string()
        .email()
        .required(requiredMessage),
      residential_address: yup
        .string()
        .required(requiredMessage),
      city: yup
        .string()
        .required(requiredMessage),
      state: yup
        .string()
        .required(requiredMessage),
      zip: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .required(requiredMessage)
        .min(5, 'Must be exactly 5 digits')
        .max(5, 'Must be exactly 5 digits'),
      phone: yup
        .string()
        .required(requiredMessage)
        .min(11, 'Must be exactly 10 digits'),
      received_first_dose: yup
        .string()
        .required(requiredMessage),
      vaccine_type: yup
        .string()
        .when("received_first_dose", {
          is: 'Yes',
          then: yup.string().required(requiredMessage)
        }),
      first_dose_date: yup
        .date()
        .nullable(true)
        .when("received_first_dose", {
          is: 'Yes',
          then: yup.date(requiredMessage).nullable(true).required(requiredMessage)
        }),
      first_dose_loc: yup
        .string()
        .when("received_first_dose", {
          is: 'Yes',
          then: yup.string().required(requiredMessage)
        }),
      first_dose_other_loc: yup
        .string()
        .when("first_dose_loc", {
          is: '8',
          then: yup.string().required(requiredMessage)
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
            onBlur={props.onBlur}
            isInvalid={props.isInvalid}
            placeholder="Select Date"
            className="datepicker"
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
        onSubmit={props.handleStartSubmit}
        initialValues={{
          first_name: "",
          last_name: "",
          dob_month: "",
          dob_date: null,
          dob_year: null,
          dob: null,
          sex: "",
          email: "",
          residential_address: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          received_first_dose: "",
          vaccine_type: "",
          first_dose_date: null,
          first_dose_loc: "",
          first_dose_other_loc: "",
        }}
        initialStatus={{}}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldTouched,
          values,
          touched,
          errors,
          status
        }) => (

          <Form className="pt-4" noValidate onSubmit={handleSubmit} autoComplete="off">
            <p>
              {t('form_instructions')}
            </p>

            <p>
              {t('form_disclaimer')}
            </p>
            <Form.Row className="mt-5">
              <Form.Group as={Col} md="4" sm="6" xs="12">
                <Form.Label>
                  {t('first_name')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control placeholder={t('first_name')}
                              name="first_name"
                              onChange={handleChange}
                              value={values.first_name}
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
                              onBlur={handleBlur}
                              isInvalid={touched.last_name && errors.last_name}/>
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3" sm="6" xs="6">
                <Form.Label>
                  {t('middle_name')}
                </Form.Label>
                <Form.Control/>
              </Form.Group>

              <Form.Group as={Col} md="1" sm="6" xs="6">
                <Form.Label>
                  {t('suffix')}
                </Form.Label>
                <Form.Control/>
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
                  <Form.Text className="pl-1">
                    { status.dob_valid &&
                      <span className="pc-color-text-secondary-dark">
                        {status.dob_valid}
                      </span>
                    }
                  </Form.Text>
                </Form.Group>
                {/* <Form.Text muted className="pl-1">
                  { status.dob_valid }
                </Form.Text> */}
            </Form.Row>

            <input type="hidden" name="dob"></input>

            <Form.Row className="mt-2">
              <Form.Group as={Col}>
                <Form.Label>
                  {t('sex')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mb-3">
                  {Object.keys(props.choices.sex).map((key, index) => 
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
                        { props.language === 'es' ? props.choices.sex[key].esp : props.choices.sex[key].eng}
                      </Form.Check.Label>
                      { index === Object.keys(props.choices.sex).length - 1 && 
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
                              onChange={e => {
                                setFieldTouched('email');
                                handleChange(e);
                              }}
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
                  <Form.Control name="zip"
                                onChange={e => {
                                  setFieldTouched('zip');
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                                isInvalid={touched.zip && errors.zip}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Row className="mt-3">
              <Form.Group as={Col}>
                <Form.Label>
                  {t('phone_number')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>

                <PhoneInput
                  country={'us'}
                  value={values.phone}
                  onChange={ value => setFieldValue('phone', value)}
                  onBlur={handleBlur}
                  countryCodeEditable={false}
                  disableDropdown={true}
                  inputProps={{
                    name: "phone",
                  }}
                />

                { touched.phone && 
                  <Form.Text className="pc-color-text-secondary-dark">
                    {errors.phone}
                  </Form.Text>
                }

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
                    id="received_first_dose_no"
                    type="radio"
                    label={t('yes_no_answer_0')}
                    value={false}
                    isInvalid={touched.received_first_dose && !!errors.received_first_dose}
                    onChange={handleChange}
                  />
                  <Form.Check
                    name="received_first_dose"
                    id="received_first_dose_yes"
                    type="radio"
                    label={t('yes_no_answer_1')}
                    value={true}
                    isInvalid={touched.received_first_dose && !!errors.received_first_dose}
                    onChange={handleChange}
                    feedback={errors.received_first_dose}
                  />
                </div>  
              </Form.Group>
            </Form.Row>

            { values.received_first_dose === 'true' && 
              <>
                <Form.Row>
                  <Form.Group as={Col}>
                    <Form.Label>
                      {t('which_received')} <span className="pc-color-text-secondary-dark">*</span>
                    </Form.Label>
                    <div className="mb-3">

                      {Object.keys(props.choices.vaccine_type).map((key, index) => 
                        <Form.Check type="radio"
                                    id={'vaccine_type_' + key}
                                    key={key}>
                          <Form.Check.Input 
                                    type="radio" 
                                    name="vaccine_type"
                                    value={key}
                                    isInvalid={touched.vaccine_type && !!errors.vaccine_type}
                                    onChange={handleChange}/>
                          <Form.Check.Label>
                            { props.language === 'es' ? props.choices.vaccine_type[key].esp : props.choices.vaccine_type[key].eng}
                          </Form.Check.Label>
                          { index === Object.keys(props.choices.vaccine_type).length - 1 && 
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
                  <Form.Group as={Col} md="4" sm="6" xs="12">
                    <DatePicker
                      name="first_dose_date"
                      selected={values.first_dose_date}
                      onChange={ date => setFieldValue('first_dose_date', date)}
                      maxDate={new Date()}
                      minDate={new Date(Date.parse("12-1-2020"))}
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
                      {Object.keys(props.choices.locations).map((key, index) => 
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
                            { props.language === 'es' ? props.choices.locations[key].esp : props.choices.locations[key].eng}
                          </Form.Check.Label> 
                          { index === Object.keys(props.choices.locations).length - 1 && 
                            <Form.Control.Feedback type="invalid">
                              {errors.first_dose_loc}
                            </Form.Control.Feedback>
                          } 
                        </Form.Check>            
                      )}
                    </div>
                  </Form.Group>
                </Form.Row>
                
                { values.first_dose_loc === '8' &&
                  <Form.Row>
                    <Form.Group as={Col} md="4" sm="6" xs="12">
                      <Form.Label>
                        Please list the location: <span className="pc-color-text-secondary-dark">*</span>
                      </Form.Label>
                      <Form.Control name="first_dose_other_loc"
                                    onChange={handleChange}
                                    value={values.first_dose_other_loc}
                                    onBlur={handleBlur}
                                    isInvalid={touched.first_dose_other_loc && errors.first_dose_other_loc}/>
                      <Form.Control.Feedback type="invalid">
                        {errors.first_dose_other_loc}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                }
                
              </>
            }

            <Button variant="primary" type="submit" className="mt-5">
              Next
            </Button>

            <BirthdayCheck></BirthdayCheck>
            <FormikErrorFocus />
          </Form>
        )}
      </Formik>
    );

}

export default withTranslation()(Start);
