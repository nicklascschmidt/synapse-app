export const validateUserInputs = (transactionObject) => {
  let { transactionAmt, toNodeId, transactionDescription, categoryName } = transactionObject;
  let errorObj = {
    isValid: true,
    errors: []
  };

  // Check if any field is empty. Return false if empty
  let isEmpty = ((transactionAmt === '') || (toNodeId === '') || (transactionDescription === '') || (categoryName === '')) ? true : false;
  if (isEmpty) {
    return errorObj = {
      isValid: false,
      errors: ['Please fill in all fields.']
    };
  }

  // Amount - num type, capped at $100 (unknown validation, testing only)
  let isNumRegex = /^\d+$/;
  let isNumValid = isNumRegex.test(transactionAmt.trim());
  let isTransactionValid = ((transactionAmt > 0) && (transactionAmt < 100)) ? true : false;
  if (!isNumValid || !isTransactionValid) {
    errorObj.errors.push('Please enter a positive amount (max $100).');
  }

  // Description - under 100 chars
  let transactionDescriptionLength = transactionDescription.length;
  let isTransactionDescriptionValid = (transactionDescriptionLength < 100) ? true : false;
  if (!isTransactionDescriptionValid) {
    errorObj.errors.push('Please enter a description under 100 characters.');
  }

  // Set isValid to false if any fields fail validation
  if (!isTransactionValid || !isTransactionDescriptionValid) {
    errorObj.isValid = false;
  }
  
  return errorObj
}
