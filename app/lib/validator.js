export default class Validator {
  constructor() {
    this.errors = {};
  }

  /**
   * Validates a field is not empty
   * @param {string} fieldName - The name of the field
   * @param {string} value - The value of the field
   */
  isRequired(fieldName, value) {
    if (!value || value.trim() === "") {
      this.errors[fieldName] = `${fieldName}_required`;
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
      this.errors[fieldName] = `${fieldName}_minLength`;
    } else if (value && value.length > max) {
      this.errors[fieldName] = `${fieldName}_maxLength`;
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
      this.errors[fieldName] = `${fieldName}_invalidEmail`;
    }
  }

  clearErrors() {
    this.errors = {};
  }

  hasErrors() {
    return Object.keys(this.errors).length > 0;
  }

  getErrors() {
    return this.errors;
  }
}
