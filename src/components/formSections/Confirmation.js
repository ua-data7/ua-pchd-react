import React, { Component } from "react";
import { withTranslation } from 'react-i18next';

class Confirmation extends Component {

  render() {

    const { t } = this.props;

    return (
      <>
        <p>
          {t('confirmation_p1')}
        </p>

        <p>
          {t('confirmation_p2')}
        </p>
        
        <p>
          {t('confirmation_p3')} <a href="http://www.pima.gov/covid19vaccine" target="_blank">www.pima.gov/covid19vaccine</a>.
        </p>
      
      </>
    );
  }
}

export default withTranslation()(Confirmation);
