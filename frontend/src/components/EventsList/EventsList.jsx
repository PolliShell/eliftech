import React, { useState, useEffect } from "react";
import styles from "./EventsList.module.css";
import { useNavigate } from "react-router-dom";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortType, setSortType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [page, sortType]);

  const fetchEvents = async () => {
    try {
      const res = await fetch(
          `http://localhost:3000/api/events?page=${page}&pageSize=5`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sortType }),
          }
      );

      const data = await res.json();
      const { events, totalPages } = data;

      setEvents([...events]);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleRegister = (event) => {
    return navigate(`/event-registration/${event._id}`, { state: { event } });
  };

  const handleViewDetails = (event) => {
    return navigate(`/event-details/${event._id}`, { state: { event } });
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
  };

  return (
      <div className={styles.container}>
        <h1 className={styles.header}>Events List</h1>
        <div className={styles.sort_container}>
          <label htmlFor="sortType">Sort by:</label>
          <select id="sortType" value={sortType} onChange={handleSortChange}>
            <option value="">-- Select --</option>
            <option value="title">Title</option>
            <option value="event_date">Date</option>
            <option value="organizer">Organizer</option>
          </select>
        </div>
        <ul className={styles["event-list"]}>
          {events.length > 0 ? (
              events.map((event) => (
                  <li key={event._id} className={styles["event-item"]}>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Дата: {event.event_date.slice(0, 10)}</p>
                    <button onClick={() => handleRegister(event)}>Register</button>
                    <button onClick={() => handleViewDetails(event)}>
                      View Details
                    </button>
                  </li>
              ))
          ) : (
              <li className={styles["event-item"]}>No events found</li>
          )}
        </ul>
        <div className={styles.pagination}>
          <button onClick={handlePreviousPage} disabled={page === 1}>
            Previous
          </button>
          <span>
          Page {page} of {totalPages}
        </span>
          <button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </button>
        </div>
      </div>
  );
};

export default EventsList;
