import React, { Component } from "react";
import { Navbar, Button, Jumbotron } from "react-bootstrap";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/pc-main-bs-override.css";

import pimaCountyLogo from './img/health-department-logo-fade.png';
import Landing from "./components/Landing";
import VaccineInterestForm from "./components/VaccineInterestForm";
import Screening from "./components/formSections/Screening";
import Educator from "./components/formSections/Educator";
import ChildcareProvider from "./components/formSections/ChildcareProvider";
import ProtectiveServices from "./components/formSections/ProtectiveServices";

import i18n from './i18n';
// import Routes from "./Routes";
// import ScrollToTop from './components/ScrollToTop'

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      step: 'protectiveServices',
      language: 'en',
    }

    this.updateStep = this.updateStep.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(language) {
    i18n.changeLanguage(language);
    this.setState({language: language})
  }

  updateStep(value) {
    this.setState({
      step: value,
    })

    console.log(value)
  }

  renderLanding() {
    return (
      <Landing updateStep={this.updateStep} changeLanguage={this.changeLanguage}></Landing>
    );
  }

  renderForm() {
    return (
      <VaccineInterestForm updateStep={this.updateStep} changeLanguage={this.changeLanguage}></VaccineInterestForm>
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

  render() {

    const {step} = this.state;

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand className="mx-auto">
            <img src={pimaCountyLogo}
                alt="Pima County Government Web Logo"
                style={{maxWidth: '200px'}}
                >
            </img>
          </Navbar.Brand>
        </Navbar>

        <div className="App container mb-8">
          {step === 'landing' &&  this.renderLanding()}
          {step === 'form' &&  this.renderForm()}
          {step === 'screening' &&  this.renderScreening()}
          {step === 'educator' &&  this.renderEducator()}
          {step === 'childcare' &&  this.renderChildcare()}
          {step === 'protectiveServices' &&  this.renderProtectiveServices()}
        </div>

        <footer className='mt-auto py-3 pc-color-gray-lightest'>
          <div className="row">
            <div className="container centered">
              2021 Pima County
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default App;
