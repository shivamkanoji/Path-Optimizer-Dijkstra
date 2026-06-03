import React from "react";
import "./routes.css";

const Routes = ({ dataPoint }) => {
  if (!dataPoint?.path) return null;

  return (
    <div className="pathAnswer">
      <div className="source">
        <span className="labelText">Source: </span>
        <span className="sourceData">{dataPoint.from}</span>
      </div>

      <div className="destination">
        <span className="labelText">Destination: </span>
        <span className="destinationData">{dataPoint.to}</span>
      </div>

      <div className="pathDetails">
  <div className="successMsg">
    ✅ Shortest Route Found
  </div>

  <span className="labelText">Path: </span>

  <span className="pathData">
    {dataPoint.path.join(" → ")}
  </span>
</div>

      <div className="totalDistance">
        <span className="labelText">Distance: </span>
        <span className="distanceData">
          {dataPoint.totalDis} m
        </span>
      </div>
    </div>
  );
};

export default Routes;