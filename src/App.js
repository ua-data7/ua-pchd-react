import React, { Component } from "react";
import { Navbar, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./css/pc-main-bs-override.css";
import pimaCountyLogo from './img/health-department-logo-fade.png';

class App extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
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

        <div className="container mb-8">
          <h4 className="pc-color-text-primary-darker">Pima County Vaccine Interest Form</h4>
        </div>
      </>
    );
  }
}

export default App;
