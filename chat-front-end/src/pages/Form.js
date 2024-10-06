import { useState } from "react";
function NewUserForm() {
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    });
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      alert(
        `First Name: ${formData.firstName}, Last Name: ${formData.lastName}, Email: ${formData.email}, Phone: ${formData.phone}`
      );
    };
  
    return (
      <section>
        <form onSubmit={handleSubmit}>
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
          
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          
          <button type="submit">Submit</button>
        </form>
      </section>
    );
  }
  export default NewUserForm;