import { useState, useRef } from "react";
import Navigator from "../components/Navigator";
import styles from "../styles/new-user.module.css"



 function NewUser() {
  const inputRef = useRef();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      });
      const [inputError, setInputError] = useState(null);
      const [password, setPassword] = useState('');
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        let error = "";

        // Check for empty fields
        if (!formData.firstName || !formData.lastName || !formData.email || !password) {
            error = "All fields are required!";
        }

        // Check for a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            error = "Invalid email format!";
        }
        if (password.length < 6) {
          error = "Password must be at least 6 characters long!";
      }
        if (error) {
            setInputError(error); // Set error message if validation fails
            return; // Exit if there's an error
        }

        // If validation passes
        alert(
            `First Name: ${formData.firstName}, Last Name: ${formData.lastName}, Email: ${formData.email}, Password: ${password}`
        );

        // Reset form data
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            password: ""
        });
        setPassword(""); // Reset the password state
        setInputError(""); // Reset the input error state
    };
      
    
    return (
    <section>
        <Navigator />
            <section className={styles.newUserFormContainer}>
              <form className={styles.newUserForm} onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                
                <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
          />
          {inputError && <div style={{ color: 'red' }}>{inputError}</div>}
                <button className={`${styles.btnSubmit} btn-primary`} type="submit" ref={inputRef}>Submit</button>
              </form>
            </section>
            
            
    </section>  
            
)
 }



      
      
export default NewUser;