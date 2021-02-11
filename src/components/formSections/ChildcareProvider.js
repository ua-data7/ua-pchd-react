import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import ReCAPTCHA from "react-google-recaptcha";

class Education extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { t } = this.props;

    const schema = yup.object({
      license: yup
        .mixed()
        .oneOf(Object.keys(this.props.choices.childcare_license))
        .required("Required."),
      employer: yup
        .string()
        .required('Required.'),
      occupation: yup
        .string()
        .required('Required.'),
    });
   
    return (
      <Formik
        validationSchema={schema}
        onSubmit={this.props.handleSubmit}
        initialValues={{
          employer: "",
          license: "",
          occupation: "",
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

          <Form noValidate onSubmit={handleSubmit} autocomplete="off">

            <Form.Row className="mt-4">
              <Form.Group as={Col} md="6" sm="12">
                <Form.Label>
                  {t('childcare_employer')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control name="employer"
                              onChange={handleChange}
                              value={values.employer}
                              onBlur={handleBlur}
                              isInvalid={touched.employer && errors.employer}/>
                <Form.Control.Feedback type="invalid">
                  {errors.employer}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>
                {t('childcare_license')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mb-3">
                  {Object.keys(this.props.choices.childcare_license).map((key, index) => 
                    <Form.Check type="radio"
                                id={'childcare_license_' + key}
                                key={key}>
                      <Form.Check.Input 
                                type="radio" 
                                name="license"
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
                  {t('childcare_occupation')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control name="occupation"
                              onChange={handleChange}
                              value={values.occupation}
                              onBlur={handleBlur}
                              isInvalid={touched.occupation && errors.occupation}/>
                <Form.Control.Feedback type="invalid">
                  {errors.occupation}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            <ReCAPTCHA
              sitekey="6LdEm0EaAAAAAD5G7tbDWA0woDjFqlSvqyN2TUqL"
              onChange={this.props.onCaptchaUpdate}
              className="mt-3"
            />

            <Button variant="primary"
                    type="submit"
                    className="mt-4 mb-5"
                    disabled={this.props.captcha === null}>
              Submit
            </Button>
            <FormikErrorFocus/>
          </Form>
        )}
      </Formik>
    );
  }
}

export default withTranslation()(Education);
