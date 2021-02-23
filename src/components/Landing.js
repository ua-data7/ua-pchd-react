import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";

class Landing extends Component {
  
  constructor(props) {
    super(props);    
    this.startForm = this.startForm.bind(this);
  }

  startForm(language) {
    this.props.startForm(language);
  }

  render() {

    return (
      <>  
        <Jumbotron className="pc-color-gray-lightest">
          <h4 className="pc-color-text-primary-darker">
            Pima County Vaccine Interest Form
          </h4>

          <p>
            Completing this form will only register your interest to receive the COVID-19 vaccine. <b>You do not have an appointment for the vaccine at this time.</b> After your eligibility has been verified, you will receive a separate email from Pima County with further details on how to schedule an appointment via MyChart to receive the vaccine.
          </p>
          <p>      
            Completar este formulario solo registrará su interés en recibir la vacuna para COVID-19. <b>No tiene cita para la vacuna en este momento.</b> Una vez que se verifique su elegibilidad, recibirá un correo electrónico del Condado de Pima con más detalles sobre cómo programar su cita por medio de MyChart para recibir la vacuna.
          </p>

          <Button className="pc-color-primary-alt-darker"
                onClick={() => this.startForm('en')}>
            English
          </Button>
          <Button className="pc-color-primary-alt-darkest ml-2"
                  onClick={() => this.startForm('es')}>
            Español
          </Button>

        </Jumbotron>
      </>

    );
  }
}

export default Landing;
