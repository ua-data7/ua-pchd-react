import i18n from './i18n';
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import Amplify from 'aws-amplify';
import Routes from "./Routes";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/pc-main-bs-override.css";
import "./App.css";
import pimaCountyLogo from './img/health-department-logo-fade.png';

import { endpoints } from "./config";


Amplify.configure({
  API: {
    endpoints: endpoints
  }
});

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      language: 'en',
      authz: false,
    }

    this.changeLanguage = this.changeLanguage.bind(this);
    this.setAuthz = this.setAuthz.bind(this);
  }

  changeLanguage(language) {
    i18n.changeLanguage(language);
    this.setState({language: language})
  }

  setAuthz(authz) {
    this.setState({authz: authz});
    console.log(authz)
  }

  render() {    

    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand className="mx-auto">
            <img src={pimaCountyLogo}
                alt="Pima County Government Web Logo"
                style={{maxWidth: '200px'}}>
            </img>
          </Navbar.Brand>
        </Navbar>

        <div className="App container mb-8">
          <Routes childProps={{
            changeLanguage:this.changeLanguage,
            language:this.state.language,
            setAuthz: this.setAuthz
          }}/>
        </div>

        <footer className='footer mt-auto py-3 pc-color-gray-lightest'>
          <div className="row centered">
            <div className="container centered m-4">
              If you need assistance, call&nbsp;<a href="tel:520-222-0119">520-222-0119</a>.
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default App;
