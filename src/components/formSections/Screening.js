import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import ReCAPTCHA from "react-google-recaptcha";
import { age_threshold, recaptcha_site_key } from "../../config";

import { ArrowLeft, ArrowRight, Check } from 'react-bootstrap-icons';

class Screening extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
    }
  }

  render() {

    const { t, language, age } = this.props;
    const requiredMessage = (language === 'en' ?  'Required.' : 'Obligatorio.');

    const schema = yup.object({
      congregate_housing: yup
        .string()
        .required(requiredMessage),
      accchs: yup
        .string()
        .required(requiredMessage),
      work_on_site: yup
        .string(),
      work_proximity: yup
        .string(),
      health_conditions: yup
        .array(),
      disability: yup
        .string()
        .required(requiredMessage),
      leave_home: yup
        .string()
        .required(requiredMessage),
      transportation: yup
        .string()
        .when("leave_home", {
          is: "0",
          then: yup.string().required(requiredMessage)
        }),
      caretakers: yup
        .array()
        .when("leave_home", {
          is: "0",
          then: yup
            .array()
            .min(1, requiredMessage)
            .required(requiredMessage)
        }),
      pref_contact: yup
        .string()
        .when("leave_home", {
          is: "0",
          then: yup.string().required(requiredMessage)
        }),
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
      occupation: yup
        .string()
        .when(["$age", "leave_home"], ($age, leave_home) => {
          if (age < age_threshold && leave_home === 1) {
            return yup.string().required(requiredMessage)
          }
        }),
    });

    let initialValues;

    if (this.props.screening !== null) {
      initialValues = this.props.screening;
      if (age >= age_threshold) {
        initialValues['occupation'] = "";
      }
    } else {
      initialValues = {
        congregate_housing: "",
        accchs: "",
        work_on_site: "",
        work_proximity: "",
        health_conditions: [],
        health_conditions_none: false,
        disability: "",
        leave_home: "",
        transportation: "",
        caretakers: [],
        pref_contact: "",
        rep_first_name: "",
        rep_last_name: "",
        rep_email: "",
        rep_phone: "",
        occupation: "",
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
          isValid,
          errors,
        }) => (

          <>
          <Button variant="primary"
              onClick={() => this.props.prevStep('start', values)}>
            <ArrowLeft></ArrowLeft> {t('back')}
          </Button>

          <Form noValidate onSubmit={handleSubmit} autoComplete="off" context={ age }>
            {/* <p>All questions with * are required.</p> */}
            
            <Form.Row className="mt-5">
              <Form.Group as={Col}>
                <Form.Label>
                  <span className="question">{t('congregate_housing_status')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mt-3">
                  {Object.keys(this.props.choices.congregate).map((key, index) => 
                    <Form.Check type="radio"
                                id={'congregate_housing_' + key}
                                key={key}
                                className="mb-2">
                      <Form.Check.Input 
                                type="radio" 
                                name="congregate_housing"
                                value={key}
                                isInvalid={touched.congregate_housing && !!errors.congregate_housing}
                                onChange={handleChange}
                                checked={values.congregate_housing === key}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.congregate[key].esp : this.props.choices.congregate[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.congregate).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.congregate_housing}
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
                  <span className="question">{t('accchs_status')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mt-2">
                  {Object.keys(this.props.choices.ahcccs).map((key, index) => 
                    <Form.Check type="radio"
                                id={'accchs_' + key}
                                key={key}
                                className="mb-2">
                      <Form.Check.Input 
                                type="radio" 
                                name="accchs"
                                value={key}
                                isInvalid={touched.accchs && !!errors.accchs}
                                onChange={handleChange}
                                checked={values.accchs === key}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.ahcccs[key].esp : this.props.choices.ahcccs[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.ahcccs).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.accchs}
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
                  <span className="question">{t('work_on_site')}</span>
                </Form.Label>
                <div className="mt-2">
                  {Object.keys(this.props.choices.work_on_site).map((key, index) => 
                    <Form.Check type="radio"
                                id={'work_on_site_' + key}
                                key={key}
                                className="mb-2">
                      <Form.Check.Input 
                                type="radio" 
                                name="work_on_site"
                                value={key}
                                isInvalid={touched.work_on_site && !!errors.work_on_site}
                                onChange={handleChange}
                                checked={values.work_on_site === key}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.work_on_site[key].esp : this.props.choices.work_on_site[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.work_on_site).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.work_on_site}
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
                  <span className="question">{t('work_proximity')}</span>
                </Form.Label>
                <div className="mt-2">
                  {Object.keys(this.props.choices.work_proximity).map((key, index) => 
                    <Form.Check type="radio"
                                id={'work_proximity_' + key}
                                key={key}
                                className="mb-2">
                      <Form.Check.Input 
                                type="radio" 
                                name="work_proximity"
                                value={key}
                                isInvalid={touched.work_proximity && !!errors.work_proximity}
                                onChange={handleChange}
                                checked={values.work_proximity === key}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.work_proximity[key].esp : this.props.choices.work_proximity[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.work_proximity).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.work_proximity}
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
                  <span className="question">{t('health_conditions')}</span>
                </Form.Label>
                <div className="mt-2">
                  {Object.keys(this.props.choices.health_conditions).map((key, index) => 
                    <Form.Check type="checkbox"
                                id={'health_conditions_' + key}
                                key={key}
                                className="mb-2">
                      <Form.Check.Input 
                                type="checkbox" 
                                name="health_conditions"
                                value={key}
                                isInvalid={touched.health_conditions && !!errors.health_conditions}
                                onChange={handleChange}
                                checked={values.health_conditions.includes(key.toString())}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.health_conditions[key].esp : this.props.choices.health_conditions[key].eng}
                      </Form.Check.Label> 
                    </Form.Check>            
                  )}

                  <Form.Check type="checkbox"
                              id="health_conditions_none"
                              className="mb-2">
                    <Form.Check.Input 
                        type="checkbox" 
                        name="health_conditions_none"
                        value={true}
                        onChange={handleChange}
                        checked={values.health_conditions_none}/>
                    <Form.Check.Label>
                      {t('none_of_above')}
                    </Form.Check.Label>
                  </Form.Check> 
                </div>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} className="mt-3">
                <Form.Label>
                  <span className="question">{t('disability')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mt-2">
                  {Object.keys(this.props.choices.disability).map((key, index) => 
                    <Form.Check type="radio"
                                id={'disability_' + key}
                                key={key}
                                className="mb-2">
                      <Form.Check.Input 
                                type="radio" 
                                name="disability"
                                value={key}
                                isInvalid={touched.disability && !!errors.disability}
                                onChange={handleChange}
                                checked={values.disability === key}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.disability[key].esp : this.props.choices.disability[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.disability).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.disability}
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
                  <span className="question">{t('leave_home')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mt-2">
                  {Object.keys(this.props.choices.leave_home).map((key, index) => 
                    <Form.Check type="radio"
                                id={'leave_home_' + key}
                                key={key}
                                className="mb-2">
                      <Form.Check.Input 
                                type="radio" 
                                name="leave_home"
                                value={key}
                                isInvalid={touched.leave_home && !!errors.leave_home}
                                onChange={e => {
                                  setFieldValue("leave_home", e.target.value);
                                  setFieldValue("occupation", "");
                                }}
                                checked={values.leave_home === key}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.leave_home[key].esp : this.props.choices.leave_home[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.leave_home).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.leave_home}
                        </Form.Control.Feedback>
                      } 
                    </Form.Check>            
                  )}
                </div>  
              </Form.Group>
            </Form.Row>

            { values.leave_home === '0' && 
              <>
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

                <Form.Row>
                  <Form.Group as={Col} className="mt-3">
                    <Form.Label>
                      <span className="question">{t('caretakers')}</span> <span className="pc-color-text-secondary-dark">*</span>
                    </Form.Label>
                    <Form.Text muted>
                      {t('ltc_documentation')}
                    </Form.Text>
                    <div className="mt-2">
                      {Object.keys(this.props.choices.caretaker).map((key, index) => 
                        <Form.Check type="checkbox"
                                    id={'caretakers_' + key}
                                    key={key}
                                    className="mb-2">
                          <Form.Check.Input 
                                    type="checkbox" 
                                    name="caretakers"
                                    value={key}
                                    isInvalid={touched.caretakers && !!errors.caretakers}
                                    onChange={handleChange}
                                    checked={values.caretakers.includes(key.toString())}/>
                          <Form.Check.Label>
                            { this.props.language === 'es' ? this.props.choices.caretaker[key].esp : this.props.choices.caretaker[key].eng}
                          </Form.Check.Label>
                          { index === Object.keys(this.props.choices.caretaker).length - 1 && 
                            <Form.Control.Feedback type="invalid">
                              {errors.caretakers}
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
              
              
              
              
              </>
            }
            
            { values.leave_home === '1' && this.props.age < age_threshold ?
              <>
                <Form.Row>
                  <Form.Group as={Col} className="mt-3">
                    <Form.Label>
                      <span className="question">{t('occupation_screening')}</span> <span className="pc-color-text-secondary-dark">*</span>
                    </Form.Label>
                    <div className="mt-2">
                      {Object.keys(this.props.choices.occupations).map((key, index) => 
                        <Form.Check type="radio"
                                    id={'occupation_' + key}
                                    key={key}
                                    className="mb-2">
                          <Form.Check.Input 
                                    type="radio" 
                                    name="occupation"
                                    value={key}
                                    isInvalid={touched.occupation && !!errors.occupation}
                                    onChange={handleChange}
                                    checked={values.occupation === key}/>
                          <Form.Check.Label>
                            { this.props.language === 'es' ? this.props.choices.occupations[key].esp : this.props.choices.occupations[key].eng}
                          </Form.Check.Label> 
                          { index === Object.keys(this.props.choices.occupations).length - 1 && 
                            <Form.Control.Feedback type="invalid">
                              {errors.occupation}
                            </Form.Control.Feedback>
                          } 
                        </Form.Check>            
                      )}
                    </div>
                  </Form.Group>
                </Form.Row>
                {
                  values.occupation === '8' ?
                    <>
                      <ReCAPTCHA
                        sitekey={recaptcha_site_key}
                        onChange={this.props.onCaptchaUpdate}
                        className="mt-3"
                      />

                      <Button variant="primary"
                              type="submit"
                              className="mt-4 mb-5"
                              disabled={this.props.captcha === null || this.props.submitting}>
                        {t('submit')} <Check></Check>
                      </Button>
                    </>
                  :
                    <>
                      <Button variant="primary" type="submit" className="mt-5 mb-5">
                        {t('next')} <ArrowRight></ArrowRight>
                      </Button>
                    </>
                }
                
              </>
              :
              <>
                <ReCAPTCHA
                  sitekey={recaptcha_site_key}
                  onChange={this.props.onCaptchaUpdate}
                  className="mt-3"
                />

                <Button variant="primary"
                        type="submit"
                        className="mt-4 mb-5"
                        disabled={this.props.captcha === null || this.props.submitting}>
                  {t('submit')} <Check></Check>
                </Button>
              </>
            }

            <FormikErrorFocus/>
          </Form>
          </>
        )}
      </Formik>
    );
  }
}

export default withTranslation()(Screening);
