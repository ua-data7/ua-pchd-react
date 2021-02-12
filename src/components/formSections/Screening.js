import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import ReCAPTCHA from "react-google-recaptcha";
import { age_threshold, recaptcha_site_key } from "../../config";

class Screening extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
    }
  }

  render() {

    const { t, language } = this.props;

    const schema = yup.object({
      occupation: yup
        .string()
        .required('Required.'),
      congregate_housing_status: yup
        .string()
        .required('Required.'),
      accchs_status: yup
        .string()
        .required('Required.'),
      health_conditions: yup
        .array()
    });

    let initialValues;

    if (this.props.screening !== null) {
      initialValues = this.props.screening;
    } else {
      initialValues = {
        occupation: "",
        congregate_housing_status: "",
        accchs_status: "",
        health_conditions: [],
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
          values,
          touched,
          isValid,
          errors,
        }) => (

          <Form noValidate onSubmit={handleSubmit} autoComplete="off">
            {/* <p>All questions with * are required.</p> */}

            <p>{this.props.age}</p>
            
            <Form.Row className="mt-5">
              <Form.Group as={Col}>
                <Form.Label>
                {t('congregate_housing_status')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mt-3">
                  {Object.keys(this.props.choices.congregate).map((key, index) => 
                    <Form.Check type="radio"
                                id={'congregate_housing_status_' + key}
                                key={key}
                                className="mb-2">
                      <Form.Check.Input 
                                type="radio" 
                                name="congregate_housing_status"
                                value={key}
                                isInvalid={touched.congregate_housing_status && !!errors.congregate_housing_status}
                                onChange={handleChange}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.congregate[key].esp : this.props.choices.congregate[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.congregate).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.congregate_housing_status}
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
                {t('accchs_status')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mt-2">
                  {Object.keys(this.props.choices.ahcccs).map((key, index) => 
                    <Form.Check type="radio"
                                id={'accchs_status_' + key}
                                key={key}
                                className="mb-2">
                      <Form.Check.Input 
                                type="radio" 
                                name="accchs_status"
                                value={key}
                                isInvalid={touched.accchs_status && !!errors.accchs_status}
                                onChange={handleChange}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.ahcccs[key].esp : this.props.choices.ahcccs[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.ahcccs).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.accchs_status}
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
                  {t('health_conditions')} <span className="pc-color-text-secondary-dark">*</span>
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
                                onChange={handleChange}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.health_conditions[key].esp : this.props.choices.health_conditions[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.health_conditions).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.health_conditions}
                        </Form.Control.Feedback>
                      } 
                    </Form.Check>            
                  )}
                </div>
              </Form.Group>
            </Form.Row>
            
            { this.props.age < age_threshold ?
              <>
                <Form.Row>
                  <Form.Group as={Col} className="mt-3">
                    <Form.Label>
                      {t('occupation_screening')} <span className="pc-color-text-secondary-dark">*</span>
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
                                    onChange={handleChange}/>
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

                <Button variant="primary" type="submit" className="mt-5 mb-5">
                  Next
                </Button>
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
                        disabled={this.props.captcha === null}>
                  Submit
                </Button>
              </>
            }

            <FormikErrorFocus/>
          </Form>
        )}
      </Formik>

    );
  }
}

export default withTranslation()(Screening);
