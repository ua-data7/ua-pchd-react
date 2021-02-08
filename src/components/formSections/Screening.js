import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';

class Screening extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
    }
  }

  render() {

    const { t } = this.props;
   
    return (
      <>
        <Form.Row className="mt-5">
          <Form.Group as={Col}>
            <Form.Label>
              {t('occupation_screening')} <span className="pc-color-text-secondary-dark">*</span>
            </Form.Label>
            <div className="mb-3">
              <Form.Check
                name="occupation_screening"
                id="childcare"
                type="radio"
                label={t('occupation_screening_answer_1')}
                value="childcare"
              />

              <Form.Check
                name="occupation_screening"
                id="education"
                type="radio"
                label={t('occupation_screening_answer_2')}
                value="education"
              />

              <Form.Check
                name="occupation_screening"
                id="ems"
                type="radio"
                label={t('occupation_screening_answer_3')}
                value="ems"
              />

              <Form.Check
                name="occupation_screening"
                id="essential_services"
                type="radio"
                label={t('occupation_screening_answer_4')}
                value="essential_services"
              />

              <Form.Check
                name="occupation_screening"
                id="healthcare_worker"
                type="radio"
                label={t('occupation_screening_answer_5')}
                value="healthcare_worker"
              />

              <Form.Check
                name="occupation_screening"
                id="healthcare_support"
                type="radio"
                label={t('occupation_screening_answer_6')}
                value="healthcare_support"
              />

              <Form.Check
                name="occupation_screening"
                id="protective_services"
                type="radio"
                label={t('occupation_screening_answer_9')}
                value="protective_services"
              />

              <Form.Check
                name="occupation_screening"
                id="none"
                type="radio"
                label={t('occupation_screening_answer_8')}
                value="none"
              />  
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
      </>

    );
  }
}

export default withTranslation()(Screening);
