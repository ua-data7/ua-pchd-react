import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';
import FormikErrorFocus from "../FormikErrorFocus";

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
      congregate_housing_status: yup
        .string()
        .required('Required.'),
      accchs_status: yup
        .string()
        .required('Required.'),
    });
   
    return (
      <Formik
        validationSchema={schema}
        onSubmit={this.props.handleScreeningSubmit}
        initialValues={{
          occupation_screening: "",
          congregate_housing_status: "",
          accchs_status: "",
          health_conditions: null
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
            {/* <p>All questions with * are required.</p> */}
            <Form.Row className="mt-5">
              <Form.Group as={Col}>
                <Form.Label>
                  {t('occupation_screening')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mb-3">
                  {Object.keys(this.props.choices.occupations).map((key, index) => 
                    <Form.Check type="radio"
                                id={'occupation_screening_' + key}
                                key={key}>
                      <Form.Check.Input 
                                type="radio" 
                                name="occupation_screening"
                                value={key}
                                isInvalid={touched.occupation_screening && !!errors.occupation_screening}
                                onChange={handleChange}/>
                      <Form.Check.Label>
                        { this.props.language === 'es' ? this.props.choices.occupations[key].esp : this.props.choices.occupations[key].eng}
                      </Form.Check.Label> 
                      { index === Object.keys(this.props.choices.occupations).length - 1 && 
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
                  {Object.keys(this.props.choices.congregate).map((key, index) => 
                    <Form.Check type="radio"
                                id={'congregate_housing_status_' + key}
                                key={key}>
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
              <Form.Group as={Col}>
                <Form.Label>
                {t('accchs_status')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mb-3">
                  {Object.keys(this.props.choices.ahcccs).map((key, index) => 
                    <Form.Check type="radio"
                                id={'accchs_status_' + key}
                                key={key}>
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
              <Form.Group as={Col}>
                <Form.Label>
                  {t('health_conditions')} <span className="pc-color-text-secondary-dark">*</span>
                </Form.Label>
                <div className="mt-3">
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

            <Button variant="primary" type="submit" className="mt-5 mb-5">
              Next
            </Button>

            <FormikErrorFocus/>
          </Form>
        )}
      </Formik>

    );
  }
}

export default withTranslation()(Screening);
