import React, { useState } from "react";
import { Button, Form, Col, Alert, InputGroup } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import { stateOptions, monthOptions } from "./Choices";
import { Typeahead, AsyncTypeahead} from 'react-bootstrap-typeahead';
import { API } from 'aws-amplify';
import moment from 'moment';
import axios from 'axios';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarEvent, ArrowRight } from 'react-bootstrap-icons';

import {esri_key} from '../../config';


/**
 * After user has entered values for all birthday fields:
 * - Check if date entered is a valid date
 * - Calculate age
 * - Validate if within age range of 16-120
 */
const BirthdayCheck = (props) => {

  const {values, setFieldValue, setStatus} = useFormikContext();
  const { language } = props;
  
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
            setStatus({dob_valid: language === 'en' ?  'Persons under the age of 16 are not eligible for the vaccine.' : 'Personas menores de 16 años de edad no son elegibles para recibir la vacuna.'});
          } else if (age > 120) {
            setStatus({
              dob_valid: language === 'en' ?  'Please check the birthday provided and correct any errors.' : 'Favor de verificar la fecha de nacimiento proporcionada y corrija cualquier error.'
            });
          } else {
            setFieldValue('age',  age);
            setFieldValue('dob',  date);  
            setStatus({dob_valid: ''}); 
          }  
        } else {
          setStatus({dob_valid: language === 'en' ?  'Please check the birthday provided and correct any errors.' : 'Favor de verificar la fecha de nacimiento proporcionada y corrija cualquier error.'});
          setFieldValue('dob', null);
        }
        
      }
  }, [values.dob_month, values.dob_date, values.dob_year]);

  return null;
};

/**
 * After user has entered zip code, check if zip code is valid and require user
 * confirmation to submit an unvalidated zip code.
 */
const ZipcodeCheck = (props) => {

  const {values, setFieldValue, setStatus} = useFormikContext();
  const { language } = props;
  
  React.useEffect(() => {

      if (values && values.zip.length === 5) {
        
        let request = {
          queryStringParameters: {zipcode: values.zip},
        }
        
        return API.get("zipCheck", "/zipCheck", request)
          .then(result => {
            console.log(result);
            if (!result.valid) {
              setFieldValue("zip_valid", false);
              setStatus({zip_error: language === 'en' ? 'The ZIP code you entered could not be found. Please update the ZIP code, or confirm what you entered is correct.' : 'No se pudo encontrar el código postal que ingresó. Actualice el código postal o confirme que lo que ingresó es correcto.'});
            } else {
              setFieldValue("zip_valid", true);
              setStatus({zip_error: ''});
            }
          })
          .then(error => {
            console.log(error)
          });
      } else {
        setStatus({zip_error: ''});
      }
  }, [values.zip]);

  return null;
};

/**
 * After user has entered zip code, check if zip code is valid and require user
 * confirmation to submit an unvalidated zip code.
 */
const AddressCheck = (props) => {

  const {values, setFieldValue, setStatus} = useFormikContext();
  const { language } = props;
  
  React.useEffect(() => {

    if (
      values &&
      values.zip.length === 5 && 
      values.residential_address.trim().length &&
      values.state.length &
      values.city.trim().length
      ) {

      
      
      axios.get("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates", {
        params: {
          address: values.residential_address,
          city: values.city,
          region: values.state,
          postal: values.zip,
          outFields: "City,RegionAbbr,Postal,ShortLabel",
          category: "Street Address",
          forStorage: true,
          token: esri_key,
          f: "json",
        }
      })
        .then(results => {
          console.log(results.data.candidates)
        })
        .catch(error => {
          console.log(error)
        });
    } else {
      setStatus({zip_error: ''});
    }
  }, [values.zip, values.state, values.city, values.residential_address]);

  return null;
};




function Start(props) {

    const { t, language } = props;
    const [addressLoading, setAddressLoading] = useState(false);
    const [addressOptions, setAddressOptions] = useState([]);
    const filterAddressBy = () => true;

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
            placeholder={t('first_dose_date_placeholder')}
            className="datepicker"
          />
          <Form.Control.Feedback type="invalid">
            {props.errors.first_dose_date}
          </Form.Control.Feedback>
        </InputGroup>
      );
    });
    

    const handleSearch = (query) => {
      setAddressLoading(true);

      axios.get("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest", {
        params: {
          text: query,
          f: "json",
          location: "-111.664,34.293" ,
          maxSuggestions: 5,
          forStorage: false,
          countryCode: 'USA',
          category: 'Street Address'
        }
      })
        .then(results => {
          // console.log(results.data.suggestions);
          
          const options = results.data.suggestions.map((result) => ({
            address: result.text,
            magicKey: result.magicKey,
          }));

          setAddressOptions(options);
          setAddressLoading(false);
        })
        .catch(error => {
          console.log(error)
        });

      // axios.get("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates", {
      //   params: {
      //     outFields: "City,Country,Postal,ShortLabel",
      //     address: query,
      //     f: "json",
      //     // maxLocations: '10',
      //     forStorage: false,
      //     sourceCountry: 'USA',
      //     category: 'Address'
      //   }
      // })
        // .then(results => {
        //   console.log(results.data.candidates);
          
        //   const options = results.data.candidates.map((result) => ({
        //     address: result.address,
        //   }));
  
        //   setAddressOptions(options);
        //   setAddressLoading(false);
        // })
        // .catch(error => {
        //   console.log(error)
        // });
  
    };

    const requiredMessage = (language === 'en' ?  'Required.' : 'Obligatorio.');

    const vaccineInterestSchema = yup.object({
      first_name: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z ]*$/, 'Name cannot contain any special characters.')
        .required(requiredMessage),
      last_name: yup
        .string()
        .trim()
        .matches(/^[a-zA-Z ]*$/, 'Name cannot contain any special characters.')
        .required(requiredMessage),
      dob_month: yup
        .string()
        .required(requiredMessage),
      dob_date: yup
        .number('Invalid date.')
        .required(requiredMessage)
        .nullable(true)
        .integer(language === 'en' ?  'Invalid date.' : 'Fecha no valida.')
        .min(1, language === 'en' ?  'Invalid date.' : 'Fecha no valida.')
        .max(31, language === 'en' ?  'Invalid date.' : 'Fecha no valida.'),
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
        .email(language === 'en' ?  'Please provide a valid email address.' : 'Favor de proporcionar un correo electrónico valido.')
        .required(requiredMessage),
      residential_address: yup
        .string()
        .trim()
        .required(requiredMessage),
      city: yup
        .string()
        .trim()
        .required(requiredMessage),
      state: yup
        .string()
        .required(requiredMessage),
      zip: yup
        .string()
        .matches(/^[0-9]+$/, language === 'en' ?  'Zip code must be 5 digits.' : 'Código postal debe tener 5 dígitos.')
        .required(requiredMessage)
        .min(5, language === 'en' ?  'Zip code must be 5 digits.' : 'Código postal debe tener 5 dígitos.')
        .max(5, language === 'en' ?  'Zip code must be 5 digits.' : 'Código postal debe tener 5 dígitos.'),
      zip_valid: yup
        .boolean()
        .oneOf([true]),
      phone: yup
        .string()
        .required(requiredMessage)
        .min(11, language === 'en' ?  'Phone number must be 10 digits.' : 'Número de teléfono debe tener 10 dígitos.'),
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
          then: yup.string().trim().required(requiredMessage)
        })
    });

  
   
    return (
      <Formik
        validationSchema={vaccineInterestSchema}
        onSubmit={props.handleStartSubmit}
        initialValues={props.start !== null ? props.start : {
          first_name: "",
          last_name: "",
          middle_name: "",
          suffix:"",
          dob_month: "",
          dob_date: "",
          dob_year: "",
          dob: null,
          sex: "",
          email: "",
          residential_address: "",
          city: "",
          state: "",
          zip: "",
          zip_valid: false,
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
          setStatus,
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

            <p>
              <b className="pc-color-text-secondary-dark">{t('form_instructions_2')}</b>
            </p>

            
            <Form.Row className="mt-5">
              <Form.Group as={Col} md="4" sm="6" xs="12">
                <Form.Label>
                  <span className="question">{t('first_name')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control placeholder={t('first_name')}
                              name="first_name"
                              onChange={event => setFieldValue("first_name", event.target.value.replace(/[^a-zA-Z\s]/g,''))}
                              value={values.first_name}
                              onBlur={handleBlur}
                              isInvalid={touched.first_name && errors.first_name}
                              maxLength="50"/>
                <Form.Control.Feedback type="invalid">
                  {errors.first_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" sm="6" xs="12">
                <Form.Label>
                  <span className="question">{t('last_name')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control placeholder={t('last_name')}
                              name="last_name"
                              onChange={event => setFieldValue("last_name", event.target.value.replace(/[^a-zA-Z\s]/g,''))}
                              value={values.last_name}
                              onBlur={handleBlur}
                              isInvalid={touched.last_name && errors.last_name}
                              maxLength="50"/>
                <Form.Control.Feedback type="invalid">
                  {errors.last_name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="3" sm="6" xs="6">
                <Form.Label>
                  <span className="question">{t('middle_name')}</span>
                </Form.Label>
                <Form.Control maxLength="50"
                              name="middle_name"
                              onChange={handleChange}
                              value={values.middle_name}/>
              </Form.Group>

              <Form.Group as={Col} md="1" sm="6" xs="6">
                <Form.Label>
                  <span className="question">{t('suffix')}</span>
                </Form.Label>
                <Form.Control maxLength="50"
                              name="suffix"
                              onChange={handleChange}
                              value={values.suffix}/>
              </Form.Group>
              
            </Form.Row>
            
            <Form.Label>
              <span className="question">{t('dob')}</span> <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            
            <Form.Row>   
                <Col lg="4" md="4" sm="6" xs="6">
                  <Form.Control as="select"
                                custom
                                defaultValue=""
                                name="dob_month"
                                value={values.dob_month}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.dob_month && errors.dob_month}
                                >
                    <option value="" disabled>{t('month')}</option>
                    {monthOptions.map((option) => <option key={option.value} value={option.value}>{option.display}</option>)}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.dob_month}
                  </Form.Control.Feedback>
                </Col>

                <Col lg="2" md="2" sm="3" xs="3">
                  <Form.Control type="text"
                                placeholder={t('day')}
                                name="dob_date"
                                value={values.dob_date}
                                onChange={event => setFieldValue("dob_date", event.target.value.replace(/\D/g,''))}
                                onBlur={handleBlur}
                                maxLength="2"
                                isInvalid={touched.dob_date && errors.dob_date}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.dob_date}
                  </Form.Control.Feedback>
                </Col>

                <Col lg="2" md="2" sm="3" xs="3">
                  <Form.Control type="text"
                                maxLength="4"
                                name="dob_year"
                                placeholder={t('year')}
                                onChange={event => setFieldValue("dob_year", event.target.value.replace(/\D/g,''))}
                                onBlur={handleBlur}
                                value={values.dob_year}
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
            </Form.Row>

            <input type="hidden" name="dob"></input>

            <Form.Row className="mt-2">
              <Form.Group as={Col}>
                <Form.Label>
                  <span className="question">{t('sex')}</span> <span className="pc-color-text-secondary-dark">*</span>
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
                                onChange={handleChange}
                                checked={values.sex === key}
                                />
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
                  <span className="question">{t('email')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control type="email"
                              name="email"
                              onChange={e => {
                                setFieldTouched('email');
                                setFieldValue("email", e.target.value.replace(/[^\x00-\x7F]/g,''));
                              }}
                              value={values.email}
                              onBlur={handleBlur}
                              isInvalid={touched.email && errors.email}
                              maxLength="150">
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
                <span className="question">{t('local_street_address')}</span> <span className="pc-color-text-secondary-dark">*</span>
              </Form.Label>
              <Form.Control placeholder="1234 Main St"
                            name="residential_address"
                            value={values.residential_address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={touched.residential_address && errors.residential_address}
                            maxLength="60">
              </Form.Control>
              {/* <AsyncTypeahead
                id="address"
                name="residential_address"
                onChange={(selected) => {
                  if (selected.length) {
                    setAddressLoading(true);
                    const value = selected[0];
                    axios.get("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates", {
                      params: {
                        outFields: "City,RegionAbbr,Postal,ShortLabel",
                        magicKey: value.magicKey,
                        SingleLine: value.address,
                        forStorage: true,
                        token: esri_key,
                        f: "json",
                      }
                    })
                      .then(results => {
                        console.log(results.data.candidates[0])
                        let result = results.data.candidates[0].attributes;
                        setFieldValue("address", result.ShortLabel);
                        setFieldValue("city", result.City);
                        setFieldValue("state", result.RegionAbbr);
                        setFieldValue("zip", result.Postal);


                        setAddressLoading(false);
                      })
                      .catch(error => {
                        console.log(error)
                      });
                  }
                }}
                handleBlur={handleBlur}
                filterBy={filterAddressBy}
                addressLoading={addressLoading}
                labelKey="address"
                minLength={3}
                onSearch={handleSearch}
                options={addressOptions}
                placeholder="1234 Main St."
                renderMenuItemChildren={(option, props) => (
                  <>
                    <span>{option.address}</span>
                  </>
                )}
              /> */}
              <Form.Control.Feedback type="invalid">
                {errors.residential_address}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} md="6" xs="12">
                  <Form.Label>
                    <span className="question">{t('city')}</span> <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control name="city"
                                value={values.city}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={touched.city && errors.city}
                                maxLength="40">
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="3" xs="6">
                  <Form.Label>
                    <span className="question">{t('state')}</span> <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control as="select"
                                value={values.state}
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
                    <span className="question">{t('zip_code')}</span> <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control name="zip"
                                onChange={e => {
                                  setFieldTouched('zip');
                                  setFieldValue("zip", e.target.value.replace(/\D/,''))
                                }}
                                value={values.zip}
                                maxLength="5"
                                onBlur={handleBlur}
                                isInvalid={touched.zip && (errors.zip || errors.zip_valid)}>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.zip}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Text className="pl-1">
                  { status.zip_error && <>
                    <span className="pc-color-text-secondary-dark">
                      {status.zip_error}
                      
                    </span>
                    <div>
                      <Button size="sm" 
                              className="mt-3"
                              variant="outline-primary"
                              onClick={() => {setFieldValue("zip_valid", true); setStatus({zip_error: ''}); }}>
                        Zip Code is Correct
                      </Button> 
                    </div>
                  </>}
                </Form.Text>
            </Form.Row>

          

            <Form.Row className="mt-3">
              <Form.Group as={Col}>
                <Form.Label>
                  <span className="question">{t('phone_number')}</span> <span className="pc-color-text-secondary-dark">*</span>
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
                  <span className="question">{t('already_recieved')}</span> <span className="pc-color-text-secondary-dark">*</span>
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
                    checked={values.received_first_dose === 'false'}
                    isInvalid={touched.received_first_dose && !!errors.received_first_dose}
                    onChange={handleChange}
                  />
                  <Form.Check
                    name="received_first_dose"
                    id="received_first_dose_yes"
                    type="radio"
                    label={t('yes_no_answer_1')}
                    value={true}
                    checked={values.received_first_dose === 'true'}
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
                      <span className="question">{t('which_received')}</span> <span className="pc-color-text-secondary-dark">*</span>
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
                                    checked={values.vaccine_type === key}
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
                  <span className="question">{t('date_received')}</span>
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
                      <span className="question">{t('where_received')}</span> <span className="pc-color-text-secondary-dark">*</span>
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
                                    checked={values.first_dose_loc === key}
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
                        <span className="question">{t('first_does_other_location')}</span> <span className="pc-color-text-secondary-dark">*</span>
                      </Form.Label>
                      <Form.Control name="first_dose_other_loc"
                                    onChange={handleChange}
                                    value={values.first_dose_other_loc}
                                    onBlur={handleBlur}
                                    isInvalid={touched.first_dose_other_loc && errors.first_dose_other_loc}
                                    maxLength="100"/>
                      <Form.Control.Feedback type="invalid">
                        {errors.first_dose_other_loc}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                }
                
              </>
            }

            <Button className="pc-color-primary-alt-darkest" type="submit" className="mt-5">
              {t('next')} <ArrowRight></ArrowRight>
            </Button>

            <AddressCheck></AddressCheck>
            <BirthdayCheck language={language}></BirthdayCheck>
            <ZipcodeCheck language={language}></ZipcodeCheck>
            <FormikErrorFocus />
          </Form>
        )}
      </Formik>
    );

}

export default withTranslation()(Start);
