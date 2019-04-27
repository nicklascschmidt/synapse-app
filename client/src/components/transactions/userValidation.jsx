export const validateUserInputs = (userObj) => {
  let { legalName, email, phoneNumber } = userObj;
  let errorObj = {
    isValid: true,
    errors: []
  };

  // Check if any field is empty. Return false if empty
  let isEmpty = ((legalName === '') || (email === '') || (phoneNumber === '')) ? true : false;
  if (isEmpty) {
    return errorObj = {
      isValid: false,
      errors: ['Please fill in all fields.']
    };
  }
  
  // Name Validation
  let nameFixed = legalName.replace(/\s\s+/g, ' ').trim(); // replace multiple spaces with one space, trim ends
  let isLengthValid = (nameFixed.length > 50) ? false : true; // max 50 characters - unknown DB validation, but seems reasonable??
  let isTypeValid = /^[a-zA-Z\s]*$/.test(nameFixed); // make sure only contains letters and spaces
  let isNameValid = (isLengthValid && isTypeValid) ? true : false;
  if (!isNameValid) {
    errorObj.errors.push('Please enter a name under 50 characters using only letters and spaces.');
  }

  // Email validation - regex for TESTING ONLY - source here: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  let isEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isEmailValid = isEmailRegex.test(email.trim());
  if (!isEmailValid) {
    errorObj.errors.push('Please enter a valid email.');
  }

  // Phone number validation
  let isPhoneNumRegex = /^\d{10}$/;
  let isPhoneNumValid = isPhoneNumRegex.test(phoneNumber.trim());
  if (!isPhoneNumValid) {
    errorObj.errors.push('Please enter a basic 10 digit phone number with no special characters.');
  }

  // Set isValid to false if any fields fail validation
  if (!isNameValid || !isEmailValid || !isPhoneNumValid) {
    errorObj.isValid = false;
  }
  
  return errorObj
}