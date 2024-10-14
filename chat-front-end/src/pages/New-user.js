import {useState} from "react";
import PageNameAndNavigator from "../components/Navigator";
import styles from "../styles/new-user.module.css";
import Submit from "../components/Submit";
import { API_URL } from '../config';


function NewUser() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reEnterPassword: "", // Changed from rePassword to reEnterPassword
  });

  const [inputError, setInputError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    reEnterPassword: "", // Error state for re-enter password
  });

  // Handle validation logic for each field
  const validateField = (name, value) => {
    let error = "";
    if (name === "firstName") {
      if (!value) {
        error = "Error : First name is required";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        error = "Error : First name should only contain letters!";
      }
    }

    // Check for valid lastName (no numbers or special characters)
    if (name === "lastName") {
      if (!value) {
        error = "Error : Last name is required";
      } else if (!/^[A-Za-z]+$/.test(value)) {
        error = "Error : Last name should only contain letters!";
      }
    }
    //validate email
    if (name === "email") {
      const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;;
      if(!value){
      error = "Error : Email is required";
      }
      else if (!emailRegex.test(value)) {
        error = "Error : Invalid email format!";
      }
    }
     //validate pw
    if(name==="password"){
      if(!value){
        error = "Error : Password is required";
      }
      else if(value.length < 6){
        error = "Error : Password must be at least 6 characters long!";
      }
    }

    // Validate re-entered password
    if(name==="reEnterPassword"){
      if(!value){
        error = "Error : Re-Enter password is required";
      }
      else if(value !== formData.password){
        error = "Error : Passwords do not match!";
      }
    }
    return error;
  };

  const handleKeyDown = (e) => {
    const { name } = e.target;
    if (name === "firstName" || name === "lastName") {
      const key = e.key;
      // Allow only letters and basic navigation keys (Backspace, Tab, etc.)
      if (!/^[a-zA-Z]+$/.test(key) && key !== "Backspace" && key !== "Tab" && key !== "ArrowLeft" && key !== "ArrowRight") {
        e.preventDefault(); // Prevent the invalid key from being entered
        setInputError((prevErrors) => ({
          ...prevErrors,
          [name]: ` ${name === "firstName" ? "First" : "Last"}  name should only contain letters!`,
        }));
      }
    }
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

  // // Handle blur event (when the user leaves the field)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setInputError((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const errors = validateAllFields();

    // If there are errors, display them and prevent form submission
    if (Object.keys(errors).length > 0) {
      setInputError(errors);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/newuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      alert(!response.ok ? data.error : data.message);
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    // Reset form data and errors
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      reEnterPassword: "", // Reset the re-entered password
    });
    setInputError({});
  };

  return (
    <section>
      <PageNameAndNavigator userType="new" />
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
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            
          />
          {inputError.firstName && <div className={styles.error}>{inputError.firstName}</div>}

          {/* Last Name Field */}
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            
          />
          {inputError.lastName && <div className={styles.error}>{inputError.lastName}</div>}

          {/* Email Field */}
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            
          />
          {inputError.email && <div className={styles.error}>{inputError.email}</div>}

          {/* Password Field */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            
          />
          {inputError.password && <div className={styles.error}>{inputError.password}</div>}

          {/* Re-enter Password Field */}
          <label htmlFor="reEnterPassword">Re-enter Password:</label>
          <input
            type="password"
            id="reEnterPassword"
            name="reEnterPassword"
            value={formData.reEnterPassword}
            onChange={handleChange}
            onBlur={handleBlur} 
            
          />
          {inputError.reEnterPassword && <div className={styles.error}>{inputError.reEnterPassword}</div>}

          {/* Submit Button */}
          <Submit/>
        </form>
      </section>
    </section>
  );
}

export default NewUser;
