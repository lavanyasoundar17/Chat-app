import { useState, useRef } from "react";
import Navigator from "../components/Navigator";
import styles from "../styles/new-user.module.css";

function NewUser() {
  const inputRef = useRef();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [inputError, setInputError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const fieldOrder = ["firstName", "lastName", "email", "password"]; // Field order for validation

  // Handle validation logic for each field
  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = `${name} is required!`;
    }

    if (name === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format!";
      }
    }

    if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters long!";
    }

    return error;
  };

  // Handle change event on input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate field when typing
    const error = validateField(name, value);
    setInputError((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Handle blur event (when the user leaves the field)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setInputError((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  // Handle field focus (when the user enters the field)
  const handleFocus = (e) => {
    const { name } = e.target;
    const currentIndex = fieldOrder.indexOf(name);
    const previousField = fieldOrder[currentIndex - 1];

    // If there is a previous field and it's not filled, block access to the current field
    if (previousField && !formData[previousField]) {
      const previousFieldError = `${previousField} is required!`;
      setInputError((prevErrors) => ({
        ...prevErrors,
        [previousField]: previousFieldError,
      }));
      e.target.blur(); // Move focus away from the current field
      document.getElementById(previousField).focus(); // Focus on the previous field
    }
  };

  // Validate all fields when submitting
  const validateAllFields = () => {
    const errors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
      }
    });
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateAllFields();

    // If there are errors, display them and prevent form submission
    if (Object.keys(errors).length > 0) {
      setInputError(errors);
      return;
    }

    // If validation passes, show success alert
    alert(
      `First Name: ${formData.firstName}, Last Name: ${formData.lastName}, Email: ${formData.email}, Password: ${formData.password}`
    );

    // Reset form data and errors
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setInputError({});
  };

  return (
    <section>
      <Navigator />
      <section className={styles.newUserFormContainer}>
        <form className={styles.newUserForm} onSubmit={handleSubmit}>
          {/* First Name Field */}
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {inputError.firstName && <div className="error">{inputError.firstName}</div>}

          {/* Last Name Field */}
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {inputError.lastName && <div className="error">{inputError.lastName}</div>}

          {/* Email Field */}
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {inputError.email && <div className="error">{inputError.email}</div>}

          {/* Password Field */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
          {inputError.password && <div className="error">{inputError.password}</div>}

          {/* Submit Button */}
          <button className={`${styles.btnSubmit} btn-primary`} type="submit" ref={inputRef}>
            Submit
          </button>
        </form>
      </section>
    </section>
  );
}

export default NewUser;
