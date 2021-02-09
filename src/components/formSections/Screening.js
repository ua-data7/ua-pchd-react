import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik, useField, useFormikContext } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

import { occupationScreeningOptions } from "./Choices";

class Screening extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
    }
  }

  render() {

    const { t, language } = this.props;

    const schema = yup.object({
      occupation_screening: yup
        .string()
        .required('Required.'),
    });
   
    return (
      <Formik
        validationSchema={schema}
        onSubmit={this.props.handleStartSubmit}
        initialValues={{
          occupation_screening: "",
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

          <Form className="pt-4" noValidate onSubmit={handleSubmit}>
            <Form.Row className="mt-5">
              <Form.Group as={Col}>
                <Form.Label>
                  {t('occupation_screening')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mb-3">
                  {occupationScreeningOptions.map((option, index) => 
                    <Form.Check type="radio"
                                id={'occupation_screening_' + option.value}>
                      <Form.Check.Input 
                                type="radio" 
                                name="occupation_screening"
                                value={option.value}
                                isInvalid={touched.occupation_screening && !!errors.occupation_screening}
                                onChange={handleChange}/>
                      <Form.Check.Label>
                        {this.props.language === 'es' ? option.spanish : option.english }
                      </Form.Check.Label>
                      { index === occupationScreeningOptions.length - 1 && 
                        <Form.Control.Feedback type="invalid">
                          {errors.occupation_screening}
                        </Form.Control.Feedback>
                      } 
                    </Form.Check>            
                  )}
                </div>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>
                {t('congregate_housing_status')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mb-3">
                  <Form.Check
                    name="congregate_housing_status"
                    id="Yes"
                    type="radio"
                    label={t('yes_no_answer_1')}
                    value="Yes"
                  />
                  <Form.Check
                    name="congregate_housing_status"
                    id="No"
                    type="radio"
                    label={t('yes_no_answer_0')}
                    value="No"
                  />
                </div>  
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>
                {t('accchs_status')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mb-3">
                  <Form.Check
                    name="accchs_status"
                    id="Yes"
                    type="radio"
                    label={t('yes_no_answer_1')}
                    value="Yes"
                  />
                  <Form.Check
                    name="accchs_status"
                    id="No"
                    type="radio"
                    label={t('yes_no_answer_0')}
                    value="No"
                  />
                </div>  
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>
                  {t('health_conditions')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                {/* <div className="mb-3">
                  {vaccineTypeOptions.map((option) => 
                    <Form.Check
                      key={option.display}
                      name="vaccine_type"
                      id={option.display}
                      type="radio"
                      label={option.display}
                      value={option.display}
                    />            
                  )}
                </div> */}
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit" className="mt-5 mb-5">
              Next
            </Button>

            <FormikErrorFocus />
          </Form>
        )}
      </Formik>

    );
  }
}

export default withTranslation()(Screening);
