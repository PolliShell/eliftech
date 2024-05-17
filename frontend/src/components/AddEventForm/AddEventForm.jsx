import React, { useState } from "react";
import axios from "axios";

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
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
      const loginResponse = await axios.post(
        "http://localhost:3000/auth/login",
        {
          username: formData.username,
          password: formData.password,
        }
      );

      if (loginResponse.data.loggedIn) {
        const eventResponse = await axios.post(
          "http://localhost:3000/events/add-event",
          formData,
          {
            withCredentials: true, // Передаем куки для аутентификации
          }
        );
        alert("Event added successfully!");
      } else {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Failed to add event:", error);
      alert("Failed to add event");
    }
  };

  return (
    <div>
      <h1>Add an Event</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="event_date">Event Date:</label>
        <input
          type="date"
          id="event_date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          required
        />

        <label htmlFor="referral_source">Referral Source:</label>
        <input
          type="text"
          id="referral_source"
          name="referral_source"
          value={formData.referral_source}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddEventForm;
