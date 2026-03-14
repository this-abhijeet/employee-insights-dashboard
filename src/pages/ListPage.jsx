import React, { useState, useEffect } from 'react';
import { fetchEmployees } from '../services/api'; // Adjust path as needed

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Employee List</h1>

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
          {employees.map((emp) => (
            <tr key={emp.id}>

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