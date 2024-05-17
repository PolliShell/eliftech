import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../FormStyles/FormStyles.module.css";

const EventRegistrationForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    referral_source: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/events/:id/register", {
        event_id: state.event._id,
        user_fullname: formData.full_name,
        user_email: formData.email,
        user_birth_date: formData.birth_date,
        referral_source: formData.referral_source,
      });

      if (response.status === 201) {
        alert("Registered successfully!");
        navigate("/");
      } else {
        alert("Failed to register for the event.");
      }
    } catch (error) {
      console.error("Failed to register for the event:", error);
      alert("Failed to register for the event.");
    }
  };

  return (
      <div className={styles.formContainer}>
        <h1>Registration for Event</h1>
        <h3>{state.event.title}</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="full_name">Fullname:</label>
          <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className={styles.inputField}
              required
          />

          <label htmlFor="email">Email:</label>
          <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.inputField}
              required
          />

          <label htmlFor="birth_date">Date of Birth:</label>
          <input
              type="date"
              id="birth_date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className={styles.inputField}
              required
          />

          <label htmlFor="referral_source">Referral Source:</label>
          <input
              type="text"
              id="referral_source"
              name="referral_source"
              value={formData.referral_source}
              onChange={handleChange}
              className={styles.inputField}
          />

          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>
  );
};

export default EventRegistrationForm;
