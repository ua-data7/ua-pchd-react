import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import ReCAPTCHA from "react-google-recaptcha";
import { recaptcha_site_key } from "../../config";

import { ArrowLeft, Check } from 'react-bootstrap-icons';
class Screening extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
    }
  }

  render() {

    const { t, language, age } = this.props;
    const requiredMessage = (language === 'en' ?  'Required.' : 'Obligatorio.');
    // homeBound = Start.props.leave_home;
    
    const schema = yup.object({
      transportation: yup
        .string()
        .required(requiredMessage),
      pref_contact: yup
        .string()
        .required(requiredMessage),
      rep_first_name: yup
        .string()
        .when("pref_contact", {
          is: "5",
          then: yup
            .string()
            .trim()
            .matches(/^[a-zA-Z ]*$/, 'Name cannot contain any special characters.')
            .required(requiredMessage)
        }),
      rep_last_name: yup
        .string()
        .when("pref_contact", {
          is: "5",
          then: yup
            .string()
            .trim()
            .matches(/^[a-zA-Z ]*$/, 'Name cannot contain any special characters.')
            .required(requiredMessage)
        }),
      rep_email: yup
        .string()
        .email(language === 'en' ?  'Please provide a valid email address.' : 'Favor de proporcionar un correo electrónico valido.')
        .when("pref_contact", {
          is: "5",
          then: yup
            .string()
            .email(language === 'en' ?  'Please provide a valid email address.' : 'Favor de proporcionar un correo electrónico valido.')
            .required(requiredMessage),
        }),
      rep_phone: yup
        .string()
        .when("pref_contact", {
          is: "5",
          then: yup
            .string()
            .required(requiredMessage)
            .min(11, language === 'en' ?  'Phone number must be 10 digits.' : 'Número de teléfono debe tener 10 dígitos.'),
        }),
    });

    let initialValues;

    if (this.props.screening !== null) {
      initialValues = this.props.screening;
    } else {
      initialValues = {
        transportation: "",
        
        pref_contact: "",
        rep_first_name: "",
        rep_last_name: "",
        rep_email: "",
        rep_phone: "",
      };
    }
   
    return (    
      <Formik
        validationSchema={schema}
        onSubmit={this.props.handleScreeningSubmit}
        initialValues={initialValues}
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
        }) => (

          <>
          <Button variant="primary"
              onClick={() => this.props.prevStep('start', values)}>
            <ArrowLeft></ArrowLeft> {t('back')}
          </Button>

          <Form noValidate onSubmit={handleSubmit} autoComplete="off" context={ age }>
            <p>All questions with * are required.</p>
            
              <Form.Row>
                <Form.Group as={Col} className="mt-3">
                  <Form.Label>
                    <span className="question">{t('transportation')}</span> <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <div className="mt-2">
                    {Object.keys(this.props.choices.transportation).map((key, index) => 
                      <Form.Check type="radio"
                                  id={'transportation_' + key}
                                  key={key}
                                  className="mb-2">
                        <Form.Check.Input 
                                  type="radio" 
                                  name="transportation"
                                  value={key}
                                  isInvalid={touched.transportation && !!errors.transportation}
                                  onChange={handleChange}
                                  checked={values.transportation === key}/>
                        <Form.Check.Label>
                          { this.props.language === 'es' ? this.props.choices.transportation[key].esp : this.props.choices.transportation[key].eng}
                        </Form.Check.Label> 
                        { index === Object.keys(this.props.choices.transportation).length - 1 && 
                          <Form.Control.Feedback type="invalid">
                            {errors.transportation}
                          </Form.Control.Feedback>
                        } 
                      </Form.Check>            
                    )}
                  </div>  
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} className="mt-3">
                  <Form.Label>
                    <span className="question">{t('pref_contact')}</span> <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <div className="mt-2">
                    {Object.keys(this.props.choices.pref_contact).map((key, index) => 
                      <Form.Check type="radio"
                                  id={'pref_contact_' + key}
                                  key={key}
                                  className="mb-2">
                        <Form.Check.Input 
                                  type="radio" 
                                  name="pref_contact"
                                  value={key}
                                  isInvalid={touched.pref_contact && !!errors.pref_contact}
                                  onChange={handleChange}
                                  checked={values.pref_contact === key}/>
                        <Form.Check.Label>
                          { this.props.language === 'es' ? this.props.choices.pref_contact[key].esp : this.props.choices.pref_contact[key].eng}
                        </Form.Check.Label> 
                        { index === Object.keys(this.props.choices.pref_contact).length - 1 && 
                          <Form.Control.Feedback type="invalid">
                            {errors.pref_contact}
                          </Form.Control.Feedback>
                        } 
                      </Form.Check>            
                    )}
                  </div>  
                </Form.Group>
              </Form.Row>

              { values.pref_contact === '5' &&
                <div className="mt-4">
                  <b>{t('representative_contact')}</b>
                  <Form.Row className="mt-3">
                    <Form.Group as={Col} md="4" sm="6" xs="12">
                      <Form.Label>
                        <span className="question">{t('first_name')}</span> <span className="pc-color-text-secondary-dark">*</span>
                      </Form.Label>
                      <Form.Control placeholder={t('first_name')}
                                    name="rep_first_name"
                                    onChange={event => setFieldValue("rep_first_name", event.target.value.replace(/[^a-zA-Z\s]/g,''))}
                                    value={values.rep_first_name}
                                    onBlur={handleBlur}
                                    isInvalid={touched.rep_first_name && errors.rep_first_name}
                                    maxLength="50"/>
                      <Form.Control.Feedback type="invalid">
                        {errors.rep_first_name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" sm="6" xs="12">
                      <Form.Label>
                        <span className="question">{t('last_name')}</span> <span className="pc-color-text-secondary-dark">*</span>
                      </Form.Label>
                      <Form.Control placeholder={t('last_name')}
                                    name="rep_last_name"
                                    onChange={event => setFieldValue("rep_last_name", event.target.value.replace(/[^a-zA-Z\s]/g,''))}
                                    value={values.rep_last_name}
                                    onBlur={handleBlur}
                                    isInvalid={touched.rep_last_name && errors.rep_last_name}
                                    maxLength="50"/>
                      <Form.Control.Feedback type="invalid">
                        {errors.rep_last_name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col} lg="4" md="8">
                      <Form.Label>
                        <span className="question">{t('email')}</span> <span className="pc-color-text-secondary-dark">*</span>
                      </Form.Label>
                      <Form.Control type="email"
                                    name="rep_email"
                                    onChange={e => {
                                      setFieldTouched('rep_email');
                                      setFieldValue("rep_email", e.target.value.replace(/[^\x00-\x7F]/g,''));
                                    }}
                                    value={values.rep_email}
                                    onBlur={handleBlur}
                                    isInvalid={touched.rep_email && errors.rep_email}
                                    maxLength="150">
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.rep_email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>

                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Label>
                        <span className="question">{t('phone_number')}</span> <span className="pc-color-text-secondary-dark">*</span>
                      </Form.Label>

                      <PhoneInput
                        country={'us'}
                        value={values.rep_phone}
                        onChange={ value => setFieldValue('rep_phone', value)}
                        onBlur={handleBlur}
                        countryCodeEditable={false}
                        disableDropdown={true}
                        inputProps={{
                          name: "rep_phone",
                        }}
                      />

                      { touched.rep_phone && 
                        <Form.Text className="pc-color-text-secondary-dark">
                          {errors.rep_phone}
                        </Form.Text>
                      }

                    </Form.Group>
                  </Form.Row>

                </div>
              
              
              }
              <ReCAPTCHA
                sitekey={recaptcha_site_key}
                onChange={this.props.onCaptchaUpdate}
                className="mt-3"
              />
              <Button variant="primary"
                      type="submit"
                      className="mt-4 mb-5"
                      disabled={this.props.captcha === null || this.props.submitting }>
                {t('submit')} <Check></Check>
              </Button> 
            <FormikErrorFocus/>
          </Form>
          </>
        )}
      </Formik>
    );
  }
}

export default withTranslation()(Screening);
