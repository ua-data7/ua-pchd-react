import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import ReCAPTCHA from "react-google-recaptcha";
import { recaptcha_site_key } from "../../config";

class EssentialServices extends Component {


  render() {

    const { t } = this.props;

    const schema = yup.object({
      occupation: yup
        .string()
        .required('Required.'),
      other_occupation: yup
        .string()
        .when("occupation", {
          is: "24",
          then: yup.string().trim().required('Required.')
      }),
      employer: yup
        .string()
        .trim()
        .required('Required.'),
    });

    let initialValues;

    if (this.props.essential_workers !== null) {
      initialValues = this.props.essential_workers;
    } else {
      initialValues = {
        employer: "",
        occupation: "",
        other_occupation: "",
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
          values,
          touched,
          errors,
        }) => (
          <>

          <Button variant="primary"
              onClick={() => this.props.prevStep('screening', values)}>
            Back
          </Button>

          <Form noValidate onSubmit={handleSubmit} autoComplete="off">
        
            <Form.Row className="mt-5">
              <Form.Group as={Col} md="6" sm="12">
                <Form.Label>
                  <span className="question">{t('essential_occupation')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control as="select"
                              custom
                              value={values.occupation}
                              name="occupation"
                              isInvalid={touched.occupation && !!errors.occupation}
                              onChange={handleChange}
                              onBlur={handleBlur}>
                  <option value="" disabled>Select Occupation</option>
                  {Object.keys(this.props.choices.essential_occupation).map((key, index) => 
                    <option key={key} value={key}>
                      { this.props.language === 'es' ? this.props.choices.essential_occupation[key].esp : this.props.choices.essential_occupation[key].eng}
                    </option>
                  )}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.occupation}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            { values.occupation === "24" &&
              <Form.Row>
                <Form.Group as={Col} md="6" sm="12">
                  <Form.Label>
                    <span className="question">{t('other_essential_occupation')}</span> <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control name="other_occupation"
                                onChange={handleChange}
                                value={values.other_occupation}
                                onBlur={handleBlur}
                                isInvalid={touched.other_occupation && errors.other_occupation}
                                maxLength="200"
                                />
                  <Form.Control.Feedback type="invalid">
                    {errors.other_occupation}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            }

            <Form.Row>
              <Form.Group as={Col} md="6" sm="12">
                <Form.Label>
                  <span className="question">{t('essential_employer')}</span> <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control name="employer"
                              onChange={handleChange}
                              value={values.employer}
                              onBlur={handleBlur}
                              isInvalid={touched.employer && errors.employer}
                              maxLength="100"/>
                <Form.Control.Feedback type="invalid">
                  {errors.employer}
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

export default withTranslation()(EssentialServices);
