export default class Validator {
    constructor() {
      this.errors = {};
    }
  
    /**
     * Validates a field is not empty
     * @param {string} fieldName - The name of the field
     * @param {string} value - The value of the field
     * @param {string} errorMessage - The error message if validation fails
     */
    isRequired(fieldName, value, errorMessage = "This field is required.") {
      if (!value || value.trim() === "") {
        this.errors[fieldName] = errorMessage;
      }
    }
  
    /**
     * Validates the length of a field value
     * @param {string} fieldName - The name of the field
     * @param {string} value - The value of the field
     * @param {number} min - The minimum length allowed
     * @param {number} max - The maximum length allowed
     */
    isLengthValid(fieldName, value, min = 0, max = Infinity) {
      if (value && value.length < min) {
        this.errors[fieldName] = `Must be at least ${min} characters long.`;
      } else if (value && value.length > max) {
        this.errors[fieldName] = `Must be no more than ${max} characters long.`;
      }
    }
  
    /**
     * Validates an email format
     * @param {string} fieldName - The name of the field
     * @param {string} value - The value of the field
     */
    isEmail(fieldName, value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        this.errors[fieldName] = "Invalid email format.";
      }
    }
  
    /**
     * Clears all errors
     */
    clearErrors() {
      this.errors = {};
    }
  
    /**
     * Checks if there are validation errors
     * @returns {boolean} - True if there are errors, false otherwise
     */
    hasErrors() {
      return Object.keys(this.errors).length > 0;
    }
  
    /**
     * Gets all validation errors
     * @returns {object} - The errors object
     */
    getErrors() {
      return this.errors;
    }
  }
  