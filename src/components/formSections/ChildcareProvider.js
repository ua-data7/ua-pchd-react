import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import ReCAPTCHA from "react-google-recaptcha";
import { recaptcha_site_key } from "../../config";

class ChildcareProvider extends Component {

  render() {

    const { t } = this.props;

    const schema = yup.object({
      license: yup
        .mixed()
        .oneOf(Object.keys(this.props.choices.childcare_license))
        .required("Required."),
      employer: yup
        .string()
        .trim()
        .required('Required.'),
      occupation: yup
        .string()
        .trim()
        .required('Required.'),
    });

    let initialValues;

    if (this.props.childcare_providers !== null) {
      initialValues = this.props.childcare_providers;
    } else {
      initialValues = {
        employer: "",
        license: "",
        occupation: "",
      };
    }
   
    return (
      <Formik
        validationSchema={schema}
        onSubmit={this.props.handleSubmit}
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
          <>
          <Button variant="primary"
              onClick={() => this.props.prevStep('screening', values)}>
            Back
          </Button>

          <Form noValidate onSubmit={handleSubmit} autocomplete="off">

            <Form.Row className="mt-4">
              <Form.Group as={Col} md="6" sm="12">
                <Form.Label>
                  <span className="question">{t('childcare_employer')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control name="employer"
                              onChange={handleChange}
                              value={values.employer}
                              onBlur={handleBlur}
                              isInvalid={touched.employer && errors.employer}
                              maxLength="200"/>
                <Form.Control.Feedback type="invalid">
                  {errors.employer}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>
                  <span className="question">{t('childcare_license')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mb-3">
                  {Object.keys(this.props.choices.childcare_license).map((key, index) => 
                    <Form.Check type="radio"
                                id={'childcare_license_' + key}
                                key={key}>
                      <Form.Check.Input 
                                type="radio" 
                                name="license"
                                checked={values.license === key}
                                value={key}
                                isInvalid={touched.license && !!errors.license}
                                onChange={handleChange}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.childcare_license[key].esp : this.props.choices.childcare_license[key].eng}
                      </Form.Check.Label>
                      { index === Object.keys(this.props.choices.childcare_license).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.license}
                        </Form.Control.Feedback>
                      } 
                    </Form.Check>            
                  )}
                </div>  
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="6" sm="12">
                <Form.Label>
                  <span className="question">{t('childcare_occupation')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control name="occupation"
                              onChange={handleChange}
                              value={values.occupation}
                              onBlur={handleBlur}
                              isInvalid={touched.occupation && errors.occupation}
                              maxLength="200"/>
                <Form.Control.Feedback type="invalid">
                  {errors.occupation}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <ReCAPTCHA
              sitekey={recaptcha_site_key}
              onChange={this.props.onCaptchaUpdate}
              className="mt-3"
            />

            <Button variant="primary"
                    type="submit"
                    className="mt-4 mb-5"
                    disabled={this.props.captcha === null || this.props.submitting}>
              Submit
            </Button>
            <FormikErrorFocus/>
          </Form>
          </>
        )}
      </Formik>
    );
  }
}

export default withTranslation()(ChildcareProvider);
