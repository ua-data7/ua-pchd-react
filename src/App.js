import i18n from './i18n';
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import Amplify from 'aws-amplify';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/pc-main-bs-override.css";
import "./App.css";

import pimaCountyLogo from './img/health-department-logo-fade.png';
import VaccineInterestForm from "./components/VaccineInterestForm";
import Landing from "./components/Landing";

Amplify.configure({
  API: {
    endpoints: [
      {
        name: "enumValues",
        endpoint: "https://frruryqr87.execute-api.us-west-2.amazonaws.com/dev",
        region: "us-west-2"
      },
      {
        name: "regPublish",
        endpoint: "https://frruryqr87.execute-api.us-west-2.amazonaws.com/dev",
        region: "us-west-2"
      },
      {
        name: "zipCheck",
        endpoint: "https://frruryqr87.execute-api.us-west-2.amazonaws.com/dev",
        region: "us-west-2"
      },
    ]
  }
});

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
      <VaccineInterestForm changeLanguage={this.changeLanguage} language={this.state.language}>
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

        <footer className='footer mt-auto py-3 pc-color-gray-lightest'>
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
