import React, { useEffect, useState } from "react";
import { fetchEmployees } from "../services/api";

const AnalyticsPage = () => {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {

    const loadEmployees = async () => {

      const data = await fetchEmployees();

      setEmployees(data);

    };

    loadEmployees();

  }, []);

  // total employees
  const totalEmployees = employees.length;

  // calculate office distribution
  const officeCount = {};

  employees.forEach(emp => {

    const office = emp.office;

    if (officeCount[office]) {
      officeCount[office]++;
    } else {
      officeCount[office] = 1;
    }

  });

  // calculate average salary
  let totalSalary = 0;

  employees.forEach(emp => {

    const salary = parseInt(emp.salary.replace(/[$,]/g, ""));

    totalSalary += salary;

  });

  const averageSalary =
    employees.length > 0 ? Math.round(totalSalary / employees.length) : 0;

  return (

    <div style={{ padding: "30px" }}>

      <h1>Employee Analytics Dashboard</h1>

      <h2>Total Employees: {totalEmployees}</h2>

      <h2>Average Salary: ${averageSalary}</h2>

      <h2>Employees per Office</h2>

      {Object.keys(officeCount).map((office) => (

        <div key={office} style={{ marginBottom: "10px" }}>

          <strong>{office}</strong>

          <div
            style={{
              height: "20px",
              width: officeCount[office] * 20 + "px",
              backgroundColor: "steelblue",
              marginTop: "5px"
            }}
          ></div>

        </div>

      ))}

    </div>

  );

};

export default AnalyticsPage;