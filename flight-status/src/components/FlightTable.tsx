// src/components/FlightTable.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import { Flight } from "../types";  // Import the Flight interface
import "../styles/FlightTable.css";

const FlightTable: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchFlights = async () => {
    try {
        setError(null);  // Reset error message before each request
        const response = await fetch("https://flight-status-mock.core.travelopia.cloud/flights");
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
  
        if (!data || data.length === 0) {
          throw new Error("No flight data available");
        }

      const filteredFlights = data.map((flight: any) => ({
        id: flight.id,
        flightNumber: flight.flightNumber,
        airline: flight.airline,
        origin: flight.origin,
        destination: flight.destination,
        departureTime: flight.departureTime,
        status: flight.status,
      }));

      setFlights(filteredFlights);
    } catch (error) {
        setError("Error fetching flight data. Please try again later.");
        console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 30000); // Fetch fresh data every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flight-container">
      <h2>Real-Time Flight Status Board</h2>
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>
                <Link to={`/flight/${flight.id}`}>{flight.flightNumber}</Link>
              </td>
              <td>{flight.airline}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{flight.departureTime}</td>
              <td>{flight.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
