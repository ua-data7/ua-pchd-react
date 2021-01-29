import React, { Component } from "react";
import { Button, Jumbotron } from "react-bootstrap";
import { withTranslation } from 'react-i18next';

class VaccineInterestForm extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      language: null,
    }

  }

  render() {
    const { t } = this.props;
    return (
      <>  
        <Button className="pc-color-primary-alt-darker"
                onClick={() => this.props.changeLanguage('en')}>
          English
        </Button>
        <Button className="pc-color-primary-alt-darkest ml-2"
                onClick={() => this.props.changeLanguage('es')}>
          Español
        </Button>
        <h2>{t('Welcome to React')}</h2>
      </>

    );
  }
}

export default withTranslation()(VaccineInterestForm);
