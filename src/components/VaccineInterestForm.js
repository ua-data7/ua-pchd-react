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
      step: 'start',
      start: null,
      screening: null,
      loading: true,
    }

    this.updateStep = this.updateStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.onCaptchaUpdate = this.onCaptchaUpdate.bind(this);
    this.handleStartSubmit = this.handleStartSubmit.bind(this);
    this.handleScreeningSubmit = this.handleScreeningSubmit.bind(this);
  }

  async componentDidMount() {
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

  prevStep() {
    
  }

  handleStartSubmit(e) {
    this.setState({start: e});
    this.updateStep('screening');
  }

  handleScreeningSubmit(e) {
    console.log(e);
    this.setState({screening: e});

    let occupation = e.occupation;

    if (occupation === '1') {
      this.setState({step: 'childcare_providers'})
    } else if (occupation === '2') {
      this.setState({step: 'educators'})
    } else if (occupation === '3' || occupation === '7') {
      this.setState({step: 'protective_services'});
    } else if (occupation === '4') {
      this.setState({step: 'essential_workers'});
    } else if (occupation === '5' || occupation === '6') {
      this.setState({step: 'healthcare_workers'});
    } else {
      this.handleSubmit();
    }
    // this.updateStep('screening');
  }

  handleSubmit() {
    console.log('submitting');

  }

  renderStart() {
    return (
      <Start language={this.props.language}
             handleStartSubmit={this.handleStartSubmit}
             choices={this.state.choices}
             start={this.state.start}>            
      </Start>
    );
  }

  renderScreening() {
    return (
      <Screening language={this.props.language}
                 handleScreeningSubmit={this.handleScreeningSubmit}
                 choices={this.state.choices}
                 screening={this.state.screening}
                 updateStep={this.updateStep}>
      </Screening>
    );
  }

  renderEducator() {
    return (
      <Educator language={this.props.language}
                choices={this.state.choices}
                handleSubmit={this.handleSubmit}
                onCaptchaUpdate={this.onCaptchaUpdate}
                captcha={this.state.captcha}
                updateStep={this.updateStep}>            
      </Educator>
    );
  }

  renderChildcare() {
    return (
      <ChildcareProvider language={this.props.language}
                         choices={this.state.choices}
                         handleSubmit={this.handleSubmit}
                         onCaptchaUpdate={this.onCaptchaUpdate}
                         captcha={this.state.captcha}
                         updateStep={this.updateStep}>            
      </ChildcareProvider>
    );
  }

  renderProtectiveServices() {
    return (
      <ProtectiveServices language={this.props.language}
                          choices={this.state.choices}
                          handleSubmit={this.handleSubmit}
                          onCaptchaUpdate={this.onCaptchaUpdate}
                          captcha={this.state.captcha}
                          updateStep={this.updateStep}>            
      </ProtectiveServices>
    );
  }

  renderEssentialServices() {
    return (
      <EssentialServices language={this.props.language}
                         choices={this.state.choices}
                         handleSubmit={this.handleSubmit}
                         onCaptchaUpdate={this.onCaptchaUpdate}
                         captcha={this.state.captcha}
                         updateStep={this.updateStep}>            
      </EssentialServices>
    );
  }

  renderHealthcare() {
    return (
      <Healthcare language={this.props.language}
                  choices={this.state.choices}
                  handleSubmit={this.handleSubmit}
                  onCaptchaUpdate={this.onCaptchaUpdate}
                  captcha={this.state.captcha}
                  updateStep={this.updateStep}>            
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
          {step === 'educators' &&  this.renderEducator()}
          {step === 'childcare_providers' &&  this.renderChildcare()}
          {step === 'protective_services' &&  this.renderProtectiveServices()}
          {step === 'essential_workers' &&  this.renderEssentialServices()}
          {step === 'healthcare_workers' &&  this.renderHealthcare()} </>
        }

      </>
    );
  }
}

export default withTranslation()(VaccineInterestForm);
