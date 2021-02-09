import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

import Start from './formSections/Start';
import Screening from "./formSections/Screening";
import Educator from "./formSections/Educator";
import ChildcareProvider from "./formSections/ChildcareProvider";
import ProtectiveServices from "./formSections/ProtectiveServices";
import EssentialServices from "./formSections/EssentialServices";
import Healthcare from "./formSections/Healthcare";


class VaccineInterestForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      step: 'start',
    }

    this.setDate = this.setDate.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.step !== prevState.step) {
      window.scrollTo(0, 0);
    }
  }

  updateStep(value) {
    this.setState({
      step: value,
    });
  }

  handleStartSubmit(e) {
    console.log(e);
    this.updateStep('screening');
  }

  setDate(field_name, date) {
    this.setState({[field_name]: date});
  }

  renderStart() {
    return (
      <Start changeLanguage={this.props.changeLanguage}
             language={this.props.language}
             setDate={this.setDate}
             vaccine_date={this.state.vaccine_date}
             handleStartSubmit={this.handleStartSubmit}>            
      </Start>
    );
  }

  renderScreening() {
    return (
      <Screening changeLanguage={this.changeLanguage}></Screening>
    );
  }

  renderEducator() {
    return (
      <Educator changeLanguage={this.changeLanguage}
                language={this.state.language}>            
      </Educator>
    );
  }

  renderChildcare() {
    return (
      <ChildcareProvider changeLanguage={this.changeLanguage}
                         language={this.state.language}>            
      </ChildcareProvider>
    );
  }

  renderProtectiveServices() {
    return (
      <ProtectiveServices changeLanguage={this.changeLanguage}
                          language={this.state.language}>            
      </ProtectiveServices>
    );
  }

  renderEssentialServices() {
    return (
      <EssentialServices changeLanguage={this.changeLanguage}
                         language={this.state.language}>            
      </EssentialServices>
    );
  }

  renderHealthcare() {
    return (
      <Healthcare changeLanguage={this.changeLanguage}
                  language={this.state.language}>            
      </Healthcare>
    );
  }

  render() {
    
    const { t } = this.props;
    const { step } = this.state;

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

        {step === 'landing' &&  this.renderLanding()}
        {step === 'start' &&  this.renderStart()}
        {step === 'screening' &&  this.renderScreening()}
        {step === 'educator' &&  this.renderEducator()}
        {step === 'childcare' &&  this.renderChildcare()}
        {step === 'protectiveServices' &&  this.renderProtectiveServices()}
        {step === 'essentialServices' &&  this.renderEssentialServices()}
        {step === 'healthcare' &&  this.renderHealthcare()}

      </>
    );
  }
}

export default withTranslation()(VaccineInterestForm);
