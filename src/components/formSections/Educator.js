import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import ReCAPTCHA from "react-google-recaptcha";

class Educator extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
    }
  }

  render() {

    const { t } = this.props;

    const schema = yup.object({
      employer: yup
        .string()
        .required('Required.'),
      other_employer: yup
        .string()
        .when("employer", {
          is: "22",
          then: yup.string().required('Required.')
      }),
      occupation: yup
        .string()
        .required('Required.'),
      other_occupation: yup
        .string()
        .when("occupation", {
          is: "12",
          then: yup.string().required('Required.')
      }),
    });
   
    return (

      <Formik
        validationSchema={schema}
        onSubmit={this.props.handleSubmit}
        initialValues={{
          employer: "",
          other_employer: "",
          occupation: "",
          other_occupation: "",
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
                  {t('educator_employer')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control as="select"
                              custom
                              defaultValue=""
                              name="employer"
                              isInvalid={touched.employer && !!errors.employer}
                              onChange={handleChange}
                              onBlur={handleBlur}>
                    <option value="" disabled>Select Employer</option>
                    {Object.keys(this.props.choices.educator_employer).map((key, index) => 
                      <option key={key} value={key}>
                        { this.props.language === 'es' ? this.props.choices.educator_employer[key].esp : this.props.choices.educator_employer[key].eng}
                      </option>
                    )}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.employer}
                  </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            
            { values.employer === "22" &&
              <Form.Row>
                <Form.Group as={Col} md="6" sm="12">
                  <Form.Label>
                    {t('educator_employer')} <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control name="other_employer"
                                onChange={handleChange}
                                value={values.other_employer}
                                onBlur={handleBlur}
                                isInvalid={touched.other_employer && errors.other_employer}/>
                  <Form.Control.Feedback type="invalid">
                    {errors.other_employer}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            }
            
            <Form.Row>
              <Form.Group as={Col} md="6" sm="12">
                <Form.Label>
                  {t('education_occupation')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control as="select"
                              custom
                              defaultValue=""
                              name="occupation"
                              isInvalid={touched.occupation && !!errors.occupation}
                              onChange={handleChange}
                              onBlur={handleBlur}>
                  <option value="" disabled>Select Occupation</option>
                  {Object.keys(this.props.choices.educator_occupation).map((key, index) => 
                    <option key={key} value={key}>
                      { this.props.language === 'es' ? this.props.choices.educator_occupation[key].esp : this.props.choices.educator_occupation[key].eng}
                    </option>
                  )}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.occupation}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            { values.occupation === "12" &&
              <Form.Row>
                <Form.Group as={Col} md="6" sm="12">
                  <Form.Label>
                    {t('education_occupation')} <span className="pc-color-text-secondary-dark">*</span>
                  </Form.Label>
                  <Form.Control name="other_occupation"
                                onChange={handleChange}
                                value={values.other_occupation}
                                onBlur={handleBlur}
                                isInvalid={touched.other_occupation && errors.other_occupation}/>
                  <Form.Control.Feedback type="invalid">
                    {errors.other_occupation}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            }

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

export default withTranslation()(Educator);
