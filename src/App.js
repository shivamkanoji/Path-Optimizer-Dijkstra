import React, { useState } from "react";
import "./App.css";
import Routes from "./routes";

const App = () => {
  const [data, setData] = useState(null);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    const a = Number(e.target[0].value);
    const b = Number(e.target[1].value);

    setError(null);

    // Validation
    if (a === b) {
      setError("Source and Destination cannot be the same.");
      return;
    }

    if (a < 1 || a > 64 || b < 1 || b > 64) {
      setError("Nodes must be between 1 and 64.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/shortd/${a}/${b}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const jsonData = await response.json();

      setData(jsonData);
      setDisplay(true);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data.");
      setDisplay(false);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainContainer">
      <div className="formInput">
        <h1 className="projectHeader">
          Path Optimizer using Dijkstra Algorithm
        </h1>

        <form onSubmit={onsubmitHandler} className="formGroup">
          <div className="sourceForm">
            <label>Source</label>
            <input
              type="number"
              min="1"
              max="64"
              placeholder="Enter Source"
              className="sourceInput"
              required
            />
          </div>

          <div className="destinationForm">
            <label>Destination</label>
            <input
              type="number"
              min="1"
              max="64"
              placeholder="Enter Destination"
              className="destinationInput"
              required
            />
          </div>

          <button className="formButton" type="submit" disabled={loading}>
            {loading ? "Finding Shortest Route..." : "Submit"}
          </button>
        </form>
      </div>

      {error && (
        <div
          style={{
            color: "#ff6b6b",
            fontWeight: "bold",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      <div className="projectDisplay">
        {display && data && <Routes dataPoint={data} />}
      </div>

      <footer
        style={{
          marginTop: "20px",
          color: "#bdbdbd",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        Built using React, Flask & Dijkstra Algorithm 🚀
      </footer>
    </div>
  );
};

export default App;