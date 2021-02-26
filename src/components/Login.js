import React, { Component } from "react";
import { Button, Jumbotron, Container, Row, Col } from "react-bootstrap";

import { Formik } from 'formik';
import * as yup from 'yup';
// import FormikErrorFocus from "../FormikErrorFocus";

class Login extends Component {
  
  constructor(props) {
    super(props);    
    // this.startForm = this.startForm.bind(this);
  }

  login(language) {
    // this.props.startForm(language);
  }

  render() {

    return (
      <>  
        <Container>
          <Row className="justify-content-md-center">
              <Col xs lg="2">
              1 of 3
              </Col>
              <Col md="auto">Variable width content</Col>
              <Col xs lg="2">
              3 of 3
              </Col>
          </Row>
        </Container>
      </>

    );
  }
}

export default Login;
