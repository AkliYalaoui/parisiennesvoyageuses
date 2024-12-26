"use server"

import send from "../config/mailer";
import Validator from "./validator";

export default async function sendEmail(previous, formData){
  const messages = {
    name: null,
    email: null,
    subject: null,
    message: null,
    error: false,
    success: false,
  };

  const validator = new Validator();

  try {
    let name = formData.get("name");
    let email = formData.get("email");
    let subject = formData.get("subject");
    let message = formData.get("message");

    // Validate fields
    validator.isRequired("name", name);
    validator.isLengthValid("name", name, 2, 50);
    validator.isRequired("email", email);
    validator.isEmail("email", email);
    validator.isRequired("subject", subject);
    validator.isLengthValid("subject", subject, 5, 100);
    validator.isRequired("message", message);
    validator.isLengthValid("message", message, 10, 1000);

    if (validator.hasErrors()) {
      return { ...messages, ...validator.getErrors() };
    }
    
    await send(name, email, subject, message);
    messages["success"] = true;
  } catch (err) {
    console.error(err);
    messages["error"] = true;
  }

  return messages;

};
