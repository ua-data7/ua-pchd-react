import React, { Component } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";



class Login extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    }

    this.login = this.login.bind(this);
  }

  login() {
    
  }

  render() {

    return (
      <>  
        <Container>
          <Row className="justify-content-center">  
            <Card style={{ width: '30rem' }}>
              <Card.Header className="text-center">Staff Login</Card.Header>
              <Card.Body>
                <Form.Row>
                  <Form.Group as={Col} xs="12">
                    <Form.Label>
                      <span className="question">Username</span> <span className="pc-color-text-secondary-dark">*</span>
                    </Form.Label>
                    <Form.Control placeholder="Username"
                                  name="username"/>
                  </Form.Group>
                  <Form.Group as={Col} xs="12">
                    <Form.Label>
                      <span className="question">Password</span> <span className="pc-color-text-secondary-dark">*</span>
                    </Form.Label>
                    <Form.Control placeholder="Password"
                                  name="username"
                                  type="password"/>
                  </Form.Group>
                </Form.Row>
                <div className="text-center">
                  <Button variant="primary" className="mt-3 text-center">
                    Login
                  </Button>
                </div>     
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </>

    );
  }
}

export default Login;
