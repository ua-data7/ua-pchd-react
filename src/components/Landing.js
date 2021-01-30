import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

class Landing extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      captcha: null,
    }

    this.onCaptchaUpdate = this.onCaptchaUpdate.bind(this);
  }

  onCaptchaUpdate(value) {
    this.setState({captcha: value});
    console.log(value)
  }

  render() {

    const {captcha} = this.state;

    return (
      <>  
        {/* <Jumbotron className="pc-color-gray-lightest"> */}
          <h4 className="pc-color-text-primary-darker">
            Pima County Vaccine Interest Form
          </h4>

          <p>
            Completing this form will only register your interest to receive the COVID-19 vaccine. <b>You do not have an appointment for the vaccine at this time.</b> After your eligibility has been verified, you will receive a separate email from Pima County with further details on how to schedule an appointment via myChart to receive the vaccine.
          </p>
          <p>      
            Completar este formulario solo registrará su interés en recibir la vacuna para COVID-19. <b>No tiene cita para la vacuna en este momento.</b> Una vez que se verifique su elegibilidad, recibirá un correo electrónico del Condado de Pima con más detalles sobre cómo programar su cita por medio de myChart para recibir la vacuna.
          </p>

          <ReCAPTCHA
            sitekey="6LdEm0EaAAAAAD5G7tbDWA0woDjFqlSvqyN2TUqL"
            onChange={this.onCaptchaUpdate}
          />

          <Button className="mt-3"
                  disabled={captcha === null}
                  onClick={() => this.props.updateStep('form')}
          >
            Continue
          </Button>

        {/* </Jumbotron> */}
      </>

    );
  }
}

export default Landing;
