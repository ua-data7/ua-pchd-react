import i18n from './i18n';
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/pc-main-bs-override.css";

import pimaCountyLogo from './img/health-department-logo-fade.png';
import VaccineInterestForm from "./components/VaccineInterestForm";
import Landing from "./components/Landing";


class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      step: 'landing',
      language: 'en',
    }

    this.startForm = this.startForm.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
  }

  changeLanguage(language) {
    i18n.changeLanguage(language);
    this.setState({language: language})
  }

  startForm(language) {
    this.changeLanguage(language);
    this.setState({
      step: 'form',
    });
  }

  renderLanding() {
    return (
      <Landing startForm={this.startForm}
               changeLanguage={this.changeLanguage}>
      </Landing>
    );
  }

  renderForm() {
    return (
      <VaccineInterestForm updateStep={this.updateStep}
                           changeLanguage={this.changeLanguage}>
      </VaccineInterestForm>
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
