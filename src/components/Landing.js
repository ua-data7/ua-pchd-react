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
          Pima County At-Home Vaccine Interest Form
          </h4>

          <p>
            Completing this form will only register your interest to receive the COVID-19 vaccine. <b>You do not have an appointment for the vaccine at this time.</b> This interest form is intended for those <b>unable</b> to leave home to receive a vaccine.  This may be due to the taxing effort it would require to leave home, or because your doctor has indicated your health or illness could worsen by leaving home.  If you are able to leave home for vaccination, please go back and register with Banner or Tucson Medical Center.             
          </p>
          <h4 className="pc-color-text-primary-darker">
          Formulario de interés en vacunas en el hogar del condado Pima
          </h4>
          <p>      
            Al completar este formulario, solo indicará su interés en recibir la vacuna contra el COVID-19. <b>Usted no tiene una cita para la vacuna en este momento.</b> Este formulario de interés está destinado a quienes no pueden salir de su hogar para recibir una vacuna. Esto puede deberse a alguna dificultad o reto para salir de su hogar, o porque su médico ha indicado que su salud o alguna enfermedad podría empeorar al salir de su hogar. Si puede salir de su hogar para vacunarse, regrese y regístrese en Banner o Tucson Medical Center.
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
