import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import Start from './formSections/Start'

class VaccineInterestForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      language: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.setDate = this.setDate.bind(this);
    this.handleVaccineInterestSubmit = this.handleVaccineInterestSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value}, console.log(this.state));
  }

  handleVaccineInterestSubmit() {

  }

  setDate(field_name, date) {
    this.setState({[field_name]: date});
  }

  render() {
    const { t } = this.props;
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

        <Form className="pt-4" noValidate onSubmit={this.handleVaccineInterestSubmit}>
          <Start handleChange={this.handleChange}
                 setDate={this.setDate}
                 vaccine_date={this.state.vaccine_date}>
          </Start>

          {/* <Button variant="primary" type="submit" className="mt-5">
            Submit
          </Button> */}
        </Form>
        

      </>

    );
  }
}

export default withTranslation()(VaccineInterestForm);
