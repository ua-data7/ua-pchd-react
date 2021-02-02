import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import { Formik } from 'formik';
import * as yup from 'yup';

import Start from './formSections/Start'

class VaccineInterestForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      language: null,
    }

    // this.handleChange = this.handleChange.bind(this);
    this.setDate = this.setDate.bind(this);
    this.handleVaccineInterestSubmit = this.handleVaccineInterestSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({[event.target.name]: event.target.value}, console.log(this.state));
  // }

  handleVaccineInterestSubmit(e) {
    console.log(e);
  }

  setDate(field_name, date) {
    this.setState({[field_name]: date});
  }

  

  render() {
    const { t } = this.props;

    const vaccineInterestSchema = yup.object({
      first_name: yup.string().required('First name is required.'),
      last_name: yup.string().required('Last name is required.'),
      dob_month: yup.string().required('Required.'),
      dob_date: yup.string().required('Required.'),
      dob_year: yup.string().required('Required.'),
      // sex: yup.string().required(),
      // email: yup.string().required(),
      // street_address: yup.string().required(),
      // city: yup.string().required(),
      // state: yup.string().required(),
      // zip: yup.string().required(),
  
    });
    
    return (
      <>  
        <Button className="pc-color-primary-alt-darker"
                onClick={() => this.props.changeLanguage('en')}>
          English
        </Button>
        <Button className="pc-color-primary-alt-darkest ml-2"
                onClick={() => this.props.changeLanguage('es')}>
          Español
        </Button>
        <h4>
          {t('form_title')}
        </h4>
        
        <p>
          {t('form_instructions')}
        </p>

        <p>
          {t('form_disclaimer')}
        </p>

        <Formik
          validationSchema={vaccineInterestSchema}
          onSubmit={this.handleVaccineInterestSubmit}
          initialValues={{
            first_name: "",
            last_name: "",
            dob_month: "",
            dob_date: null,
            dob_year: null,
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form className="pt-4" noValidate onSubmit={handleSubmit}>
              <Start handleChange={handleChange}
                     handleBlur={handleBlur}
                     setDate={this.setDate}
                     vaccine_date={this.state.vaccine_date}
                     values={values}
                     touched={touched}
                     isValid={isValid}
                     errors={errors}>
              </Start>

              <Button variant="primary" type="submit" className="mt-5">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        

      </>

    );
  }
}

export default withTranslation()(VaccineInterestForm);
