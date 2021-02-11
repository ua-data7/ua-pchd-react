import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withTranslation } from 'react-i18next';
import { API } from 'aws-amplify';


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
      captcha: null,
      step: 'childcare',
      loading: true,
    }

    this.updateStep = this.updateStep.bind(this);
    this.onCaptchaUpdate = this.onCaptchaUpdate.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
    this.handleScreeningSubmit = this.handleScreeningSubmit.bind(this);
  }

  componentDidMount() {
    return API.get("enumValues", "/enumValues")

    .then(choices => {
      this.setState({
        choices: choices,
        loading: false
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.step !== prevState.step) {
      window.scrollTo(0, 0);
    }
    console.log(this.state);
  }

  onCaptchaUpdate(value) {
    this.setState({captcha: value});
    console.log(value)
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
    if (e.occupation_screening === '') {

    }
    // this.updateStep('screening');
  }

  handleSubmit(e) {
    console.log(e);
    // if (e.occupation_screening === '') {

    // }
    // this.updateStep('screening');
  }

  renderStart() {
    return (
      <Start language={this.props.language}
             handleStartSubmit={this.handleStartSubmit}
             choices={this.state.choices}>            
      </Start>
    );
  }

  renderScreening() {
    return (
      <Screening language={this.props.language}
                 handleScreeningSubmit={this.handleScreeningSubmit}
                 choices={this.state.choices}>
      </Screening>
    );
  }

  renderEducator() {
    return (
      <Educator changeLanguage={this.changeLanguage}
                language={this.props.language}
                choices={this.state.choices}
                handleSubmit={this.handleSubmit}>            
      </Educator>
    );
  }

  renderChildcare() {
    return (
      <ChildcareProvider changeLanguage={this.changeLanguage}
                         language={this.props.language}
                         choices={this.state.choices}
                         handleSubmit={this.handleSubmit}
                         onCaptchaUpdate={this.onCaptchaUpdate}
                         captcha={this.state.captcha}>            
      </ChildcareProvider>
    );
  }

  renderProtectiveServices() {
    return (
      <ProtectiveServices changeLanguage={this.changeLanguage}
                          language={this.props.language}
                          choices={this.state.choices}>            
      </ProtectiveServices>
    );
  }

  renderEssentialServices() {
    return (
      <EssentialServices changeLanguage={this.changeLanguage}
                         language={this.props.language}
                         choices={this.state.choices}>            
      </EssentialServices>
    );
  }

  renderHealthcare() {
    return (
      <Healthcare changeLanguage={this.changeLanguage}
                  language={this.props.language}
                  choices={this.state.choices}>            
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

        { !this.state.loading && <>
          {step === 'start' &&  this.renderStart()}
          {step === 'screening' &&  this.renderScreening()}
          {step === 'educator' &&  this.renderEducator()}
          {step === 'childcare' &&  this.renderChildcare()}
          {step === 'protectiveServices' &&  this.renderProtectiveServices()}
          {step === 'essentialServices' &&  this.renderEssentialServices()}
          {step === 'healthcare' &&  this.renderHealthcare()} </>
        }

      </>
    );
  }
}

export default withTranslation()(VaccineInterestForm);
