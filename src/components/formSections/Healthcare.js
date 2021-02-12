import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import ReCAPTCHA from "react-google-recaptcha";
import { recaptcha_site_key } from "../../config";

class Healthcare extends Component {

  render() {

    const { t } = this.props;

    const schema = yup.object({
      occupation: yup
        .string()
        .required('Required.'),
      other_occupation: yup
        .string()
        .when("occupation", {
          is: "47",
          then: yup.string().required('Required.')
      }),
      employer: yup
        .string()
        .required('Required.'),
      ltc: yup
        .mixed()
        .oneOf(Object.keys(this.props.choices.ltc))
        .required("Required."),
    });
   
   
    return (
      <Formik
        validationSchema={schema}
        onSubmit={this.props.handleSubmit}
        initialValues={{
          employer: "",
          occupation: "",
          other_occupation: "",
          ltc: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (

          <Form noValidate onSubmit={handleSubmit} autoComplete="off">

            <Form.Row className="mt-5">
              <Form.Group as={Col} md="6" sm="12">
                <Form.Label>
                  {t('hcw_occupation')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <Form.Control as="select"
                              custom
                              defaultValue=""
                              name="occupation"
                              isInvalid={touched.occupation && !!errors.occupation}
                              onChange={handleChange}
                              onBlur={handleBlur}>
                  <option value="" disabled>Select Occupation</option>
                  {Object.keys(this.props.choices.hcw_occupation).map((key, index) => 
                    <option key={key} value={key}>
                      { this.props.language === 'es' ? this.props.choices.hcw_occupation[key].esp : this.props.choices.hcw_occupation[key].eng}
                    </option>
                  )}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.occupation}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>

            { values.occupation === "47" &&
              <Form.Row>
                <Form.Group as={Col} md="6" sm="12">
                  <Form.Label>
                    {t('other_hcw_occupation')} <span className="pc-color-text-secondary-dark">*</span>
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

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>
                {t('ltc')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mb-3">
                  {Object.keys(this.props.choices.ltc).map((key, index) => 
                    <Form.Check type="radio"
                                id={'ltc_' + key}
                                key={key}>
                      <Form.Check.Input 
                                type="radio" 
                                name="ltc"
                                value={key}
                                isInvalid={touched.ltc && !!errors.ltc}
                                onChange={handleChange}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.ltc[key].esp : this.props.choices.ltc[key].eng}
                      </Form.Check.Label>
                      { index === Object.keys(this.props.choices.ltc).length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.ltc}
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
                  {t('hcw_employer')} <span className="pc-color-text-secondary-dark">*</span>
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
            <FormikErrorFocus/>
          </Form>
        )}
      </Formik>

    );
  }
}

export default withTranslation()(Healthcare);
