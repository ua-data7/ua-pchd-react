import React, { Component } from "react";
import { Button, Container, Row, Col, Card, Form } from "react-bootstrap";
import { API } from 'aws-amplify';
import Cookies from 'js-cookie';

class Login extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      error: '',
    }

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async login() {
    
    const payload = {
      username: this.state.username,
      password: this.state.password,
    }
    
    let submission = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload,
    }

    console.log(payload)

    return API.post("authz", "/authz", submission)
      .then(result => {
        Cookies.set('authz_code', result.authz_code);
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({error: "There was an error logging in. Please check your username and password and try again."})
      });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {

    const {username, password} = this.state;

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
                                  name="username"
                                  onChange={this.handleChange}/>
                  </Form.Group>
                  <Form.Group as={Col} xs="12">
                    <Form.Label>
                      <span className="question">Password</span> <span className="pc-color-text-secondary-dark">*</span>
                    </Form.Label>
                    <Form.Control placeholder="Password"
                                  name="password"
                                  type="password"
                                  onChange={this.handleChange}/>
                  </Form.Group>
                </Form.Row>
                <div className="text-center">
                  <Button variant="primary"
                          className="mt-3"
                          disabled={username.length === 0 || password.length === 0}
                          onClick={this.login}>
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
