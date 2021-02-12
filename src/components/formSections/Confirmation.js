import React, { Component } from "react";
import { Button, Form, Col } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

class Confirmation extends Component {

  render() {

    const { t } = this.props;

    return (
      <>
        <p>
            Thank you for your interest in receiving the COVID-19 vaccine. We are processing your request and will contact you with registration details as we determine your eligibility and as vaccines are available. Do not register again. Vaccines are in short supply and will be provided to our community’s most vulnerable first. We appreciate your cooperation to protect everyone in Pima County.
        </p>
        <p>
          You will receive registration instructions for MyChart@tmcaz.com. Check your spam/junk folder.
        </p>
        
        <p>
          For more information, visit our website pima.gov/covid19vaccine.
        </p>
      
      </>
    );
  }
}

export default withTranslation()(Confirmation);
