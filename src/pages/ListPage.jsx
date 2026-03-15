import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { fetchEmployees } from '../services/api';

const EmployeeDashboard = () => {

  const navigate = useNavigate(); // 👈 ADDED

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const getData = async () => {

      try {

        setLoading(true);

        const data = await fetchEmployees();

        setEmployees(data);

      } catch (err) {

        setError("Failed to load employee data.");

      } finally {

        setLoading(false);

      }

    };

    getData();

  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.office.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading employees...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (

    <div>

      <h1>Employee List</h1>

      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
          width: "300px"
        }}
      />

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Office</th>
            <th>Employee ID</th>
            <th>Start Date</th>
            <th>Salary</th>
          </tr>

        </thead>

        <tbody>

          {filteredEmployees.map((emp) => (
            <tr
              key={emp.id}
              onClick={() => navigate(`/employee/${emp.id}`, { state: emp })}
              style={{ cursor: "pointer" }}
            >

              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.office}</td>
              <td>{emp.employeeId}</td>
              <td>{emp.startDate}</td>
              <td>{emp.salary}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default EmployeeDashboard;