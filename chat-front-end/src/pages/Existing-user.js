import { useState} from "react";
import PageNameAndNavigator from "../components/Navigator";
import Submit from "../components/Submit";
import styles from "../styles/new-user.module.css";


function ExistingUser(){
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const [inputError, setInputError] = useState({
        email: "",
        password: "",
      });
      const validateField = (name, value) => {
        let error = "";
        if (name === "email") {
            const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;;
            if(!value){
            error = "Error : Email is required";
            }
            else if (!emailRegex.test(value)) {
              error = "Error : Invalid email format!";
            }
          }
          if(name==="password"){
            if(!value){
              error = "Error : Password is required";
            }
          }
          return error;
      }
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

      const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setInputError((prevErrors) => ({
          ...prevErrors,
          [name]: error,
        }));
      };
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
            const response = await fetch('http://localhost:5000/api/existinguser', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
        
            const data = await response.json();
        
            if (!response.ok) {
              // Handle error response
              alert(data.error);
            } else {
              // Handle success response
              alert(data.message);
            }
          } catch (error) {
            console.error('Error submitting form:', error);
          }
        
        setFormData({
            email: "",
            password: ""
          });
          setInputError({});
        };
      
    
    return (
        <section>
      <PageNameAndNavigator userType="Existing user" />
      <section className={styles.newUserFormContainer}>
      <form className={styles.newUserForm} onSubmit={handleSubmit}>
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
          {/* Submit Button */}
          <Submit/>
        </form>

      </section>

      </section>
    );
}
export default ExistingUser;