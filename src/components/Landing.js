import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import VaccineInterestForm from "./VaccineInterestForm"

class Landing extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      step: 'landing',
    }

    this.startForm = this.startForm.bind(this);
  }

  startForm(language) {
    this.props.changeLanguage(language);
    this.setState({
      step: 'form',
    });
  }

  renderForm() {
    return (
      <VaccineInterestForm changeLanguage={this.props.changeLanguage}
                           language={this.props.language}
                           authz={this.props.authz}>
      </VaccineInterestForm>
    );
  }

  renderLanding() {
    return (
      <>  
        <Jumbotron className="pc-color-gray-lightest">
          <h4 className="pc-color-text-primary-darker">
            Pima County Vaccine Interest Form
          </h4>

          <p>
            Completing this form will only register your interest to receive the COVID-19 vaccine. <b>You do not have an appointment for the vaccine at this time.</b> This interest form is intended for those <b>unable</b> to leave home to receive a vaccine.  This may be due to the taxing effort it would require to leave home, or because your doctor has indicated your health or illness could worsen by leaving home.  If you are able to leave home for vaccination, please go back and register with Banner or Tucson Medical Center. 
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

  render() {
    return (
    <>
      {this.state.step === 'landing' && this.renderLanding()}
      {this.state.step === 'form' && this.renderForm()}
    </>
    )        
  }
}

export default Landing;
