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
      step: 'screening',
    }

    this.setDate = this.setDate.bind(this);
    this.updateStep = this.updateStep.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
    this.handleScreeningSubmit = this.handleScreeningSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.step !== prevState.step) {
      window.scrollTo(0, 0);
    }
    console.log(this.state);
  }

  updateStep(value) {
    this.setState({
      step: value,
    });
  }

  handleStartSubmit(e) {
    this.setState({start: e});
    this.updateStep('screening');
  }

  handleScreeningSubmit(e) {
    console.log(e);
    // this.setState({start: e});
    // this.updateStep('screening');
  }

  setDate(field_name, date) {
    this.setState({[field_name]: date});
  }

  renderStart() {
    return (
      <Start language={this.props.language}
             handleStartSubmit={this.handleStartSubmit}>            
      </Start>
    );
  }

  renderScreening() {
    return (
      <Screening language={this.props.language}
                 handleScreeningSubmit={this.handleScreeningSubmit}>
      </Screening>
    );
  }

  renderEducator() {
    return (
      <Educator changeLanguage={this.changeLanguage}
                language={this.props.language}>            
      </Educator>
    );
  }

  renderChildcare() {
    return (
      <ChildcareProvider changeLanguage={this.changeLanguage}
                         language={this.props.language}>            
      </ChildcareProvider>
    );
  }

  renderProtectiveServices() {
    return (
      <ProtectiveServices changeLanguage={this.changeLanguage}
                          language={this.props.language}>            
      </ProtectiveServices>
    );
  }

  renderEssentialServices() {
    return (
      <EssentialServices changeLanguage={this.changeLanguage}
                         language={this.props.language}>            
      </EssentialServices>
    );
  }

  renderHealthcare() {
    return (
      <Healthcare changeLanguage={this.changeLanguage}
                  language={this.props.language}>            
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
