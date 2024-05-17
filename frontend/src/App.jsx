import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EventsList from "./components/EventsList/EventsList";
import EventRegistrationForm from "./components/EventRegistationForm/EventRegistationForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Navbar />
          <div className="app-wrapper-content">
            <Routes>
              <Route path="/" element={<EventsList />} />
              <Route path="/event-registration/:id" element={<EventRegistrationForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUpForm />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
