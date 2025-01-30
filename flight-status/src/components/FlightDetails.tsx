// src/components/FlightDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Flight } from "../types";  // Import the Flight interface
import "../styles/FlightDetails.css";

const FlightDetails: React.FC = () => {
    const { id } = useParams();  // Get the flight id from the URL
    const [flightDetails, setFlightDetails] = useState<Flight | null>(null);
    const [error, setError] = useState<string | null>(null);  // State for error message
  
    const fetchFlightDetails = async () => {
      if (!id) return;
      try {
        setError(null);  // Reset error message before each request
        const response = await fetch(`https://flight-status-mock.core.travelopia.cloud/flights/${id}`);
  
        if (!response.ok) {
          throw new Error("Failed to fetch flight details");
        }
  
        const data = await response.json();
  
        if (!data) {
          throw new Error("Flight details not found");
        }
  
        setFlightDetails(data);
      } catch (error) {
        setError("Error fetching flight details. Please try again later.");
        console.error("Error fetching flight details:", error);
      }
    };
  
    useEffect(() => {
      fetchFlightDetails();
    }, [id]);  // Re-fetch when the flight ID changes
  
    if (error) {
      return <p style={{ color: "red" }}>{error}</p>;  // Show error message if there's an error
    }
  
    if (!flightDetails) {
      return <p>Loading...</p>;  // Show loading message while waiting for the data
    }
  
    return (
      <div>
        <h2>Flight Details</h2>
        <div className="flight-detail">
          <p><strong>Flight Number:</strong> {flightDetails.flightNumber}</p>
          <p><strong>Airline:</strong> {flightDetails.airline}</p>
          <p><strong>Origin:</strong> {flightDetails.origin}</p>
          <p><strong>Destination:</strong> {flightDetails.destination}</p>
          <p><strong>Departure Time:</strong> {flightDetails.departureTime}</p>
          <p><strong>Status:</strong> {flightDetails.status}</p>
          {/* Add any other relevant flight details here */}
        </div>
      </div>
    );
  };
  
  export default FlightDetails;