import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate
import styles from "../FormStyles/FormStyles.module.css"; // Правильный импорт CSS модуля

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Инициализируем useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          { username, password }
      );
      if (response.data.token) {
        console.log("Logged in successfully!");
        navigate("/"); // Перенаправление на главную страницу
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Error during login. Please try again later.");
    }
  };

  return (
      <div className={styles.formContainer}>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleLogin}>
          <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
          />
          <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
          />
          <button type="submit" className={styles.submitButton}>Login</button>
        </form>
      </div>
  );
};

export default LoginForm;
