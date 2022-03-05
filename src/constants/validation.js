module.exports = {
    Errors: {
      REQUIRED_ERROR: 'This field is required',
      INVALID_EMAIL: 'Enter a valid email',
    },
    Patterns: {
      EMAIL_PATTERN: /\S+@\S+\.\S+/,
    },
    MinLength: (minLength) => {
      let error = `Please enter minimum ${minLength} characters`;
      return error;
    },
    MaxLength: (MaxLength) => {
      let error = `Only ${MaxLength} characters is allowed`;
      return error;
    },
    Min: (minValue) => {
      let error = `Minimum value is ${minValue}`;
      return error;
    },
    Max: (maxValue) => {
      let error = `Maximum value is ${maxValue}`;
      return error;
    },
  };
  