import React from "react";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import IdentityVerification from "../components/IdentityVerification";

const DetailsPage = () => {

  const location = useLocation();

  const employee = location.state;

  if (!employee) {

    return <h2>No Employee Data Found</h2>;

  }

  return (

    <div style={{ padding: "20px" }}>

      <h1>Employee Details</h1>

      <p><b>Name:</b> {employee.name}</p>

      <p><b>Position:</b> {employee.position}</p>

      <p><b>Office:</b> {employee.office}</p>

      <p><b>Employee ID:</b> {employee.employeeId}</p>

      <p><b>Start Date:</b> {employee.startDate}</p>

      <p><b>Salary:</b> {employee.salary}</p>

      <IdentityVerification />

    </div>

  );

};

export default DetailsPage;