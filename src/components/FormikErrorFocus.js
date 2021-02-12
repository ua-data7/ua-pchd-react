import React from 'react';
import { connect } from 'formik';

class ErrorFocus extends React.Component {
  componentDidUpdate(prevProps) {
    const { isSubmitting, isValidating, errors } = prevProps.formik;
    const keys = Object.keys(errors);
    if (keys.length > 0 && isSubmitting && !isValidating) {
      
      let selector = null;

      if (keys[0] === 'dob') {
        selector = `[name="dob_month"]`;
      } else {
        selector = `[name="${keys[0]}"]`;
      }

      const errorElement = document.querySelector(selector);
      errorElement.focus();
    }
  }

  render() {
    return null;
  }
}

export default connect(ErrorFocus);